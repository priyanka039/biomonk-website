const BUCKET = "resources";

/** Build a public Supabase Storage URL from a stored file_path. */
export function getPublicFileUrl(filePath: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return filePath;
  const clean = filePath.replace(/^\//, "");
  return `${base}/storage/v1/object/public/${BUCKET}/${clean}`;
}

export const RESOURCE_FOLDERS: Record<string, string> = {
  notes: "resources/notes",
  dpp: "resources/dpp",
  pyqs: "resources/pyqs",
  "mock-tests": "resources/mock-tests",
  "course-cover": "courses/covers",
};

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024; // 25 MB
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

export const IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export function isImageCategory(category: string): boolean {
  return category === "course-cover";
}

export function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

export function folderForCategory(category: string): string {
  return RESOURCE_FOLDERS[category] ?? "resources/notes";
}
