import { ZodError } from "zod";

/** Turn Zod failures into human-readable strings for the admin UI. */
export function formatZodError(error: ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length ? `${issue.path.join(".")}: ` : "";
    return `${path}${issue.message}`;
  });
}

export function zodErrorResponse(error: ZodError, status = 400) {
  return Response.json(
    { ok: false, errors: formatZodError(error) },
    { status }
  );
}
