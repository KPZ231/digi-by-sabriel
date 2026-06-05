import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import type { WooCategory } from "@/types/product.types";

type Props = {
  categories: WooCategory[];
};

export default function ProductsHero({ categories }: Props) {
  const displayCats = categories.length > 0
    ? categories
    : [
        { id: "1", databaseId: 1, slug: "urodziny", name: "Urodziny", count: 0, image: null },
        { id: "2", databaseId: 2, slug: "slub", name: "Ślub", count: 0, image: null },
        { id: "3", databaseId: 3, slug: "baby-shower", name: "Baby Shower", count: 0, image: null },
        { id: "4", databaseId: 4, slug: "swieta", name: "Święta", count: 0, image: null },
        { id: "5", databaseId: 5, slug: "wiosna", name: "Wiosna", count: 0, image: null },
      ];

  return (
    <section
      className="w-full pt-10 pb-12 md:pt-14 md:pb-16"
      style={{ background: "linear-gradient(180deg, #fff8f5 0%, #ffeede 55%, #fff8f5 100%)" }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <nav aria-label="Nawigacja okruszkowa" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-[#8a7263]">
            <li>
              <Link href="/" className="hover:text-[#944a00] transition-colors duration-200">
                Strona główna
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#ddc1af]">/</li>
            <li className="text-[#944a00] font-semibold" aria-current="page">
              Grafiki
            </li>
          </ol>
        </nav>

        <SectionLabel>Kolekcja</SectionLabel>

        <h1
          className="mt-4 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#241912] leading-tight max-w-xl"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          Wszystkie{" "}
          <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[#944a00] to-[#c9a227]">
            grafiki
          </em>
        </h1>

        <p className="mt-4 text-[#564335] text-base md:text-lg max-w-lg leading-relaxed">
          Ponad 300 unikalnych projektów do scrapbookingu. Pobierz natychmiast po zakupie — bez czekania.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {displayCats.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium border border-[#ddc1af] text-[#564335] bg-white/60 hover:bg-[#944a00] hover:text-white hover:border-[#944a00] transition-all duration-200"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
