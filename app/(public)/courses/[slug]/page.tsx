import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Users, Clock, Check, PlayCircle, MessageCircle } from "lucide-react";
import { COURSES, getCourse } from "@/lib/data/courses";
import { formatINR } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { CourseTabs } from "@/components/courses/CourseTabs";
import { LeadDialog } from "@/components/shared/LeadDialog";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: `${course.title} — NEET Biology`,
    description: course.description,
    alternates: { canonical: `/courses/${course.slug}` },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const discount = Math.round(
    ((course.price - course.salePrice) / course.price) * 100
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <Link
        href="/courses"
        className="text-sm text-muted hover:text-cream"
      >
        ← All courses
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Main */}
        <div>
          <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
            {course.categoryLabel}
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-cream sm:text-5xl text-balance">
            {course.title}
          </h1>
          <p className="mt-3 text-lg text-parchment/80">{course.tagline}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5 text-amber">
              <Star size={15} className="fill-amber" /> {course.rating}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users size={15} /> {course.students.toLocaleString("en-IN")}{" "}
              students
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} /> {course.durationLabel} ·{" "}
              {course.lessonCount} lessons
            </span>
            <span>Updated {course.lastUpdated}</span>
          </div>

          {/* Preview placeholder */}
          <div className="mt-7 flex aspect-video items-center justify-center rounded-2xl border border-moss bg-gradient-to-br from-moss/50 via-forest to-ink">
            <div className="flex flex-col items-center gap-2 text-parchment/70">
              <PlayCircle size={48} className="text-gold" />
              <span className="text-sm">Watch the free 5-min course trailer</span>
            </div>
          </div>

          <p className="mt-7 leading-relaxed text-parchment/80">
            {course.description}
          </p>

          <div className="mt-10">
            <CourseTabs course={course} />
          </div>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-gold/30 bg-forest p-6 shadow-[0_24px_60px_-30px_rgba(90,0,157,0.5)]">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-semibold text-cream">
                {formatINR(course.salePrice)}
              </span>
              <span className="text-lg text-muted line-through">
                {formatINR(course.price)}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-gold">
              {discount}% off · EMI options available
            </p>

            <LeadDialog
              triggerLabel="Request Access →"
              triggerClassName="mt-5 w-full"
              context={course.title}
              intent="enroll"
            />

            <a
              href={whatsappLink(
                `Hi Vicky Sir, I have a question about the "${course.title}" course.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/50 text-sm font-medium text-[#25D366] hover:bg-[#25D366]/10"
            >
              <MessageCircle size={16} />
              Have a question? Ask on WhatsApp
            </a>

            <div className="mt-6 border-t border-moss pt-5">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
                What&apos;s included
              </p>
              <ul className="space-y-2.5">
                {course.whatsIncluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-parchment"
                  >
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.description,
            provider: {
              "@type": "Organization",
              name: "BioMonk",
              sameAs: process.env.NEXT_PUBLIC_APP_URL || "https://biomonk.in",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: course.rating,
              ratingCount: course.students,
            },
          }),
        }}
      />
    </div>
  );
}
