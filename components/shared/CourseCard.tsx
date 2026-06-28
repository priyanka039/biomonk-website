import Link from "next/link";
import { Star, Users, Clock } from "lucide-react";
import type { Course } from "@/lib/data/courses";
import { formatINR } from "@/lib/utils";

export function CourseCard({ course }: { course: Course }) {
  const discount = Math.round(
    ((course.price - course.salePrice) / course.price) * 100
  );

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-moss bg-forest transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_20px_50px_-20px_rgba(90,0,157,0.4)]"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-sage/30 via-forest to-moss">
        <span className="font-display text-5xl font-semibold gold-text opacity-40">
          Bio
        </span>
        {course.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
            {course.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full border border-moss bg-white/85 px-2.5 py-1 text-xs font-medium text-gold backdrop-blur">
          {course.categoryLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold leading-tight text-cream group-hover:text-amber">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-parchment/70">
          {course.tagline}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1 text-amber">
            <Star size={13} className="fill-amber" /> {course.rating}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users size={13} /> {course.students.toLocaleString("en-IN")}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={13} /> {course.durationLabel}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-cream">
                {formatINR(course.salePrice)}
              </span>
              <span className="text-sm text-muted line-through">
                {formatINR(course.price)}
              </span>
            </div>
            <span className="text-xs font-medium text-gold">
              {discount}% off
            </span>
          </div>
          <span className="inline-flex h-10 items-center rounded-full gold-gradient px-4 text-sm font-semibold text-ink">
            Enroll
          </span>
        </div>
      </div>
    </Link>
  );
}
