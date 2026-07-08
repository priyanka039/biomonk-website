import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { getCourses } from "@/lib/cms";

export const metadata: Metadata = {
  title: "NEET Biology Courses — Dropper, Class 12 & Crash Course",
  description:
    "Find your NEET Biology course: dropper batch, Class 12 foundation, and 60-day crash course. NCERT-first, rank-oriented, taught personally by Vicky Sir.",
  alternates: { canonical: "/courses" },
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <SectionLabel>Courses</SectionLabel>
      <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-cream sm:text-6xl text-balance">
        Find Your NEET Biology Course
      </h1>
      <p className="mt-4 max-w-xl text-parchment/80">
        Every course is NCERT-first, rank-oriented, and taught personally by
        Vicky Sir. Pick the track that fits where you are right now.
      </p>

      <div className="mt-10">
        <CourseGrid courses={courses} />
      </div>
    </div>
  );
}
