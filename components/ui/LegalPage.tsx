import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type LegalContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "subheading"; text: string }
  | { type: "highlight"; text: string }
  | { type: "contact"; label: string; value: string; href?: string };

export type LegalSection = {
  id: string;
  title: string;
  content: LegalContentBlock[];
};

export type LegalPageProps = {
  label?: string;
  title: string;
  subtitle?: string;
  effectiveDate?: string;
  sections: LegalSection[];
};

/* ─── Table of Contents ──────────────────────────────────────────────────── */

function TableOfContents({ sections }: { sections: LegalSection[] }) {
  if (sections.length === 0) return null;
  return (
    <nav aria-label="Spis treści" className="hidden lg:block">
      <div className="bg-white rounded-2xl border border-[#f3dfd2] p-6 shadow-sm">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#944a00] mb-5">
          Spis treści
        </p>
        <ol className="space-y-1">
          {sections.map((sec, i) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                className="flex items-start gap-3 text-sm text-[#564335] hover:text-[#944a00] transition-colors py-1.5 group"
              >
                <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-[#ffeade] text-[#944a00] text-[10px] font-bold group-hover:bg-[#944a00] group-hover:text-white transition-colors mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-snug">{sec.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

/* ─── Content block renderer ─────────────────────────────────────────────── */

function ContentBlock({ block }: { block: LegalContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[#564335] leading-relaxed text-base">
          {block.text}
        </p>
      );

    case "subheading":
      return (
        <h3
          className="text-lg font-bold text-[#241912] mt-2"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          {block.text}
        </h3>
      );

    case "list":
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={`space-y-2 text-[#564335] text-base ${
            block.ordered ? "list-decimal list-inside" : ""
          }`}
        >
          {block.items.map((item, i) => (
            <li key={i} className={block.ordered ? "" : "flex items-start gap-2.5"}>
              {!block.ordered && (
                <span
                  aria-hidden="true"
                  className="mt-2 w-1.5 h-1.5 rounded-full bg-[#944a00] shrink-0"
                />
              )}
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </Tag>
      );

    case "highlight":
      return (
        <div className="bg-[#ffeade] rounded-2xl px-6 py-5 border border-[#f3dfd2] flex gap-4 items-start">
          <span
            aria-hidden="true"
            className="w-5 h-5 shrink-0 mt-0.5 text-[#944a00]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
          <p className="text-[#564335] text-sm leading-relaxed">{block.text}</p>
        </div>
      );

    case "contact":
      return (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[#8a7263] min-w-[100px]">{block.label}:</span>
          {block.href ? (
            <a
              href={block.href}
              className="font-semibold text-[#944a00] hover:text-[#713700] underline underline-offset-4 decoration-[#944a00]/30 transition-colors"
            >
              {block.value}
            </a>
          ) : (
            <span className="font-semibold text-[#241912]">{block.value}</span>
          )}
        </div>
      );

    default:
      return null;
  }
}

/* ─── Section ────────────────────────────────────────────────────────────── */

function LegalSectionBlock({
  section,
  index,
}: {
  section: LegalSection;
  index: number;
}) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-24">
      <div className="flex items-start gap-4 mb-6">
        <span
          aria-hidden="true"
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#ffeade] text-[#944a00] text-sm font-black"
        >
          {index + 1}
        </span>
        <h2
          id={`${section.id}-heading`}
          className="text-2xl font-bold text-[#241912] leading-snug"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          {section.title}
        </h2>
      </div>

      {section.content.length > 0 ? (
        <div className="ml-12 space-y-4">
          {section.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>
      ) : (
        <div className="ml-12">
          <p className="text-[#8a7263] italic text-sm">
            Treść tej sekcji zostanie uzupełniona.
          </p>
        </div>
      )}
    </section>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function LegalPage({
  label = "Informacje prawne",
  title,
  subtitle,
  effectiveDate,
  sections,
}: LegalPageProps) {
  return (
    <main aria-labelledby="legal-page-heading" className="bg-[#fff8f5]">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-14 pb-12 md:pt-20 md:pb-16"
        style={{
          background:
            "radial-gradient(ellipse at 90% 0%, #ffdcc5 0%, transparent 50%), radial-gradient(ellipse at 5% 100%, #ffe4f3 0%, transparent 45%), #fff8f5",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-20 w-72 h-72 bg-[#f27f0d]/6 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-56 h-56 bg-pink-200/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <SectionLabel>{label}</SectionLabel>

          <h1
            id="legal-page-heading"
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-[#241912] leading-[1.1] max-w-2xl"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-lg text-[#564335] leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {effectiveDate && (
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#8a7263] bg-white border border-[#f3dfd2] px-4 py-2 rounded-full shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 text-[#944a00]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Obowiązuje od: {effectiveDate}
              </span>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#564335] hover:text-[#944a00] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Wróć na stronę
            </Link>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12 xl:gap-16">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 self-start mb-10 lg:mb-0">
            <TableOfContents sections={sections} />
          </aside>

          {/* Sections */}
          <article className="min-w-0">
            {sections.length > 0 ? (
              <div className="space-y-12">
                {sections.map((section, i) => (
                  <div key={section.id}>
                    <LegalSectionBlock section={section} index={i} />
                    {i < sections.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="mt-12 h-px bg-gradient-to-r from-[#944a00]/20 via-[#ddc1af]/30 to-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#f3dfd2] p-10 text-center shadow-sm">
                <div
                  aria-hidden="true"
                  className="w-14 h-14 bg-[#ffeade] rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-[#944a00]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <p
                  className="text-xl font-bold text-[#241912] mb-2"
                  style={{ fontFamily: "var(--font-family-display)" }}
                >
                  Treść zostanie uzupełniona
                </p>
                <p className="text-[#8a7263] text-sm">
                  Ta strona jest w przygotowaniu.
                </p>
              </div>
            )}
          </article>
        </div>
      </div>

    </main>
  );
}
