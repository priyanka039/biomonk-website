import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { logger } from "@/lib/logger";
import {
  MAX_UPLOAD_BYTES,
  MAX_IMAGE_BYTES,
  IMAGE_MIME_TYPES,
  isImageCategory,
  sanitizeFilename,
  folderForCategory,
} from "@/lib/storage";

const BUCKET = "resources";

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;
  const { user } = auth;

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, errors: ["Supabase not configured"] },
      { status: 503 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  const category = String(form.get("category") ?? "notes");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, errors: ["File is required"] },
      { status: 400 }
    );
  }

  const isImage = isImageCategory(category);
  const maxBytes = isImage ? MAX_IMAGE_BYTES : MAX_UPLOAD_BYTES;

  if (file.size > maxBytes) {
    return NextResponse.json(
      {
        ok: false,
        errors: [
          isImage ? "Image exceeds 5 MB" : "PDF exceeds 25 MB",
        ],
      },
      { status: 400 }
    );
  }

  if (isImage && file.type && !IMAGE_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { ok: false, errors: ["Use JPEG, PNG, or WebP for course covers"] },
      { status: 400 }
    );
  }

  const defaultName = isImage ? "cover.jpg" : "document.pdf";
  const safeName = sanitizeFilename(file.name || defaultName);
  const folder = folderForCategory(category);
  let filePath = `${folder}/${safeName}`;

  const { data: existing } = await supabase.storage.from(BUCKET).list(folder, {
    search: safeName,
  });

  if (existing?.some((f) => f.name === safeName)) {
    const stamp = Date.now();
    filePath = `${folder}/${stamp}-${safeName}`;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, buffer, {
      contentType: file.type || "application/pdf",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { ok: false, errors: [uploadError.message] },
      { status: 500 }
    );
  }

  logger.info("file uploaded", {
    userId: user.id,
    filePath,
    size: file.size,
  });

  return NextResponse.json({
    ok: true,
    data: {
      file_path: filePath,
      file_size: file.size,
      mime_type: file.type || "application/pdf",
    },
  });
}
