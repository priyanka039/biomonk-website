import { NextResponse } from "next/server";
import {
  getResourceById,
  incrementDownloadCount,
} from "@/lib/cms";
import { getPublicFileUrl } from "@/lib/storage";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const resource = await getResourceById(id);

  if (!resource) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await incrementDownloadCount(id);

  return NextResponse.redirect(getPublicFileUrl(resource.file_path), 302);
}
