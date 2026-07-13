import { revalidatePath } from "next/cache";

/** Bust the static public pages after CMS mutations. */
export function revalidatePublicSite() {
  revalidatePath("/", "layout");
  revalidatePath("/courses");
  revalidatePath("/results");
  revalidatePath("/about");
  revalidatePath("/mentor-connect");
  revalidatePath("/free-tools/neet-predictor");
}
