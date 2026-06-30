import { Check } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";
import { siteConfig, whatsappLink } from "@/lib/site";

// Honest, paraphrased student messages — styled like WhatsApp chats.
const MESSAGES = [
  {
    name: "Mehak",
    initial: "M",
    text: "Sir aaj ka daily MCQ kar liya 🙌 Botany finally clicking. Thank you for replying so fast!",
    time: "08:14",
  },
  {
    name: "Rohit",
    initial: "R",
    text: "The NCERT-first approach is exactly how the paper asked. Scored 340+ in Bio 🎯",
    time: "21:02",
  },
  {
    name: "Ananya",
    initial: "A",
    text: "Error Book is a game changer. I stopped repeating the same silly mistakes 🙏",
    time: "13:47",
  },
  {
    name: "Karthik",
    initial: "K",
    text: "Went from 290 to 671 in Biology over my drop year. The structure just works.",
    time: "19:30",
  },
  {
    name: "Sneha",
    initial: "S",
    text: "Mind maps for every chapter made revision so fast. Wish I'd joined in Class 11!",
    time: "10:08",
  },
  {
    name: "Aditya",
    initial: "A",
    text: "Direct access to a mentor who actually replies. Rare and honestly priceless.",
    time: "22:15",
  },
];

export function WhatsAppWall() {
  return (
    <section className="border-y border-moss bg-forest/40 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">
            From the community
          </SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
            What students message us
          </h2>
          <p className="mt-4 text-parchment/70">
            Real conversations from the BioMonk WhatsApp community — daily MCQs,
            doubts, and wins.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MESSAGES.map((m) => (
            <div
              key={`${m.name}-${m.time}`}
              className="rounded-2xl border border-moss bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full gold-gradient text-sm font-bold text-white">
                  {m.initial}
                </span>
                <div>
                  <div className="text-sm font-semibold text-cream">
                    {m.name}
                  </div>
                  <div className="text-xs text-muted">+91 ·····  ··{m.time}</div>
                </div>
              </div>
              <div className="mt-3 rounded-2xl rounded-tl-sm bg-forest/70 px-4 py-3 text-sm leading-relaxed text-parchment">
                {m.text}
                <span className="mt-1 flex items-center justify-end gap-0.5 text-[10px] text-sage">
                  {m.time}
                  <Check size={12} className="-mr-1" />
                  <Check size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CtaButton
            href={siteConfig.whatsappGroupLink || whatsappLink()}
            size="lg"
          >
            Join the WhatsApp community →
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
