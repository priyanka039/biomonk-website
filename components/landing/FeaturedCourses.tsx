import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CourseCard } from "@/components/shared/CourseCard";
import type { Course } from "@/lib/data/courses";
import { COURSES } from "@/lib/data/courses";

export function FeaturedCourses({ courses = COURSES }: { courses?: Course[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <SectionLabel>Courses</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
            Built to move your Biology rank
          </h2>
        </div>
        <Link
          href="/courses"
          className="text-sm font-medium text-gold hover:underline"
        >
          View all courses →
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </section>
  );
}
