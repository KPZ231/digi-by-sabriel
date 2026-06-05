"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import SectionLabel from "@/components/ui/SectionLabel";
import type { WooProduct, WooCategory } from "@/types/product.types";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Popularność" },
  { value: "price-asc", label: "Cena: rosnąco" },
  { value: "price-desc", label: "Cena: malejąco" },
  { value: "newest", label: "Nowości" },
];

const RATING_OPTIONS = [
  { value: 0, label: "Wszystkie" },
  { value: 4, label: "4★ i więcej" },
  { value: 4.5, label: "4.5★ i więcej" },
  { value: 5, label: "Tylko 5★" },
];

function parsePrice(priceStr: string): number {
  return parseFloat(priceStr.replace(/[^\d,.-]/g, "").replace(",", ".")) || 0;
}

type Props = {
  products: WooProduct[];
  categories: WooCategory[];
};

type FilterSidebarProps = {
  categories: WooCategory[];
  selectedCategories: string[];
  minPriceStr: string;
  maxPriceStr: string;
  minRating: number;
  sortBy: SortOption;
  activeCount: number;
  onCategoryToggle: (slug: string) => void;
  onMinPrice: (v: string) => void;
  onMaxPrice: (v: string) => void;
  onRating: (v: number) => void;
  onSort: (v: SortOption) => void;
  onClear: () => void;
};

function FilterSidebar({
  categories,
  selectedCategories,
  minPriceStr,
  maxPriceStr,
  minRating,
  sortBy,
  activeCount,
  onCategoryToggle,
  onMinPrice,
  onMaxPrice,
  onRating,
  onSort,
  onClear,
}: FilterSidebarProps) {
  return (
    <aside
      className="w-full lg:w-64 xl:w-72 shrink-0 bg-white rounded-2xl border border-[#f3dfd2] shadow-sm overflow-hidden"
      aria-label="Filtry produktów"
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#f3dfd2]">
        <SectionLabel>Filtry</SectionLabel>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-semibold text-[#944a00] hover:text-[#713700] transition-colors underline underline-offset-2"
          >
            Wyczyść ({activeCount})
          </button>
        )}
      </div>

      <div className="divide-y divide-[#f3dfd2]">
        {/* Category */}
        <div className="px-5 py-5">
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#241912] mb-4">
            Kategoria
          </h3>
          <ul className="flex flex-col gap-2.5">
            {categories.map((cat) => {
              const checked = selectedCategories.includes(cat.slug);
              return (
                <li key={cat.id}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-150 ${
                        checked
                          ? "bg-[#944a00] border-[#944a00]"
                          : "border-[#ddc1af] group-hover:border-[#944a00]"
                      }`}
                      aria-hidden="true"
                    >
                      {checked && (
                        <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => onCategoryToggle(cat.slug)}
                      aria-label={cat.name}
                    />
                    <span className={`text-sm transition-colors duration-150 ${checked ? "text-[#944a00] font-semibold" : "text-[#564335] group-hover:text-[#944a00]"}`}>
                      {cat.name}
                    </span>
                    {cat.count > 0 && (
                      <span className="ml-auto text-xs text-[#8a7263]">{cat.count}</span>
                    )}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Price range */}
        <div className="px-5 py-5">
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#241912] mb-4">
            Przedział cenowy
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-[#8a7263] uppercase tracking-wider font-semibold mb-1 block">
                Od
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={minPriceStr}
                  onChange={(e) => onMinPrice(e.target.value)}
                  className="w-full pr-7 pl-2.5 py-1.5 text-sm text-[#241912] bg-[#fff8f5] border border-[#ddc1af] rounded-lg focus:outline-none focus:border-[#944a00] focus:ring-1 focus:ring-[#944a00]/20 transition-all"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#8a7263]">zł</span>
              </div>
            </div>
            <span className="text-[#ddc1af] font-light mt-5">—</span>
            <div className="flex-1">
              <label className="text-[10px] text-[#8a7263] uppercase tracking-wider font-semibold mb-1 block">
                Do
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  placeholder="∞"
                  value={maxPriceStr}
                  onChange={(e) => onMaxPrice(e.target.value)}
                  className="w-full pr-7 pl-2.5 py-1.5 text-sm text-[#241912] bg-[#fff8f5] border border-[#ddc1af] rounded-lg focus:outline-none focus:border-[#944a00] focus:ring-1 focus:ring-[#944a00]/20 transition-all"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#8a7263]">zł</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="px-5 py-5">
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#241912] mb-4">
            Ocena
          </h3>
          <div className="flex flex-col gap-1.5">
            {RATING_OPTIONS.map((opt) => {
              const active = minRating === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onRating(opt.value)}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-left transition-all duration-150 ${
                    active
                      ? "bg-[#944a00]/10 text-[#944a00] font-semibold"
                      : "text-[#564335] hover:bg-[#fff1ea]"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-all ${
                      active ? "border-[#944a00] bg-[#944a00]" : "border-[#ddc1af]"
                    }`}
                    aria-hidden="true"
                  />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort */}
        <div className="px-5 py-5">
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#241912] mb-4">
            Sortuj według
          </h3>
          <div className="flex flex-col gap-1.5">
            {SORT_OPTIONS.map((opt) => {
              const active = sortBy === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onSort(opt.value)}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-left transition-all duration-150 ${
                    active
                      ? "bg-[#944a00]/10 text-[#944a00] font-semibold"
                      : "text-[#564335] hover:bg-[#fff1ea]"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-all ${
                      active ? "border-[#944a00] bg-[#944a00]" : "border-[#ddc1af]"
                    }`}
                    aria-hidden="true"
                  />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <span className="text-6xl mb-5 opacity-30 select-none">✦</span>
      <h3
        className="text-xl font-bold text-[#241912] mb-2"
        style={{ fontFamily: "var(--font-family-display)" }}
      >
        Brak pasujących grafik
      </h3>
      <p className="text-[#564335] text-sm mb-6 max-w-xs">
        Spróbuj zmienić filtry lub wyczyść je, aby zobaczyć wszystkie produkty.
      </p>
      <button
        onClick={onClear}
        className="px-6 py-2.5 rounded-full bg-[#944a00] text-white text-sm font-bold hover:bg-[#713700] transition-colors"
      >
        Wyczyść filtry
      </button>
    </motion.div>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#944a00]/10 text-[#944a00] text-xs font-semibold rounded-full"
    >
      {label}
      <button
        onClick={onRemove}
        aria-label={`Usuń filtr: ${label}`}
        className="hover:text-[#713700] transition-colors leading-none"
      >
        ×
      </button>
    </motion.span>
  );
}

export default function ProductsView({ products, categories }: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPriceStr, setMinPriceStr] = useState("");
  const [maxPriceStr, setMaxPriceStr] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setMinPriceStr("");
    setMaxPriceStr("");
    setMinRating(0);
    setSortBy("popular");
  }

  const filtered = useMemo(() => {
    const minP = minPriceStr === "" ? 0 : parseFloat(minPriceStr);
    const maxP = maxPriceStr === "" ? Infinity : parseFloat(maxPriceStr);

    return products
      .filter((p) => {
        if (selectedCategories.length > 0) {
          const slugs = p.productCategories.nodes.map((c) => c.slug);
          if (!selectedCategories.some((s) => slugs.includes(s))) return false;
        }
        const price = parsePrice(p.price);
        if (price < minP || price > maxP) return false;
        if (minRating > 0 && p.averageRating !== undefined && p.averageRating < minRating)
          return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return parsePrice(a.price) - parsePrice(b.price);
          case "price-desc":
            return parsePrice(b.price) - parsePrice(a.price);
          case "newest":
            return b.databaseId - a.databaseId;
          default:
            return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
        }
      });
  }, [products, selectedCategories, minPriceStr, maxPriceStr, minRating, sortBy]);

  const activeCount =
    selectedCategories.length +
    (minPriceStr !== "" ? 1 : 0) +
    (maxPriceStr !== "" ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  const featured = filtered[0];
  const sideCards = filtered.slice(1, 5);
  const restCards = filtered.slice(5);

  return (
    <section className="w-full py-8 md:py-10" style={{ background: "#fff8f5" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Mobile filter toggle bar */}
        <div className="lg:hidden mb-5 flex items-center justify-between">
          <p className="text-sm text-[#564335]">
            <span className="font-bold text-[#241912]">{filtered.length}</span> grafik
          </p>
          <button
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#ddc1af] text-sm font-semibold text-[#564335] bg-white hover:border-[#944a00] hover:text-[#944a00] transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Filtry
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#944a00] text-white text-[10px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Filter sidebar — mobile collapse, desktop sticky */}
          <AnimatePresence>
            {(mobileFiltersOpen || true) && (
              <motion.div
                className={`w-full lg:w-auto lg:sticky lg:top-24 ${mobileFiltersOpen ? "block" : "hidden"} lg:block`}
                initial={false}
              >
                <FilterSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  minPriceStr={minPriceStr}
                  maxPriceStr={maxPriceStr}
                  minRating={minRating}
                  sortBy={sortBy}
                  activeCount={activeCount}
                  onCategoryToggle={toggleCategory}
                  onMinPrice={setMinPriceStr}
                  onMaxPrice={setMaxPriceStr}
                  onRating={setMinRating}
                  onSort={setSortBy}
                  onClear={clearFilters}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content area */}
          <div className="flex-1 min-w-0">
            {/* Results bar + active filter chips */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="hidden lg:flex items-center justify-between">
                <p className="text-sm text-[#564335]">
                  <span className="font-bold text-[#241912]">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? "grafika" : "grafik"}
                </p>
              </div>

              {activeCount > 0 && (
                <motion.div layout className="flex flex-wrap gap-2">
                  <AnimatePresence mode="popLayout">
                    {selectedCategories.map((slug) => {
                      const cat = categories.find((c) => c.slug === slug);
                      return (
                        <ActiveChip
                          key={slug}
                          label={cat?.name ?? slug}
                          onRemove={() => toggleCategory(slug)}
                        />
                      );
                    })}
                    {minPriceStr !== "" && (
                      <ActiveChip
                        key="min-price"
                        label={`Od ${minPriceStr} zł`}
                        onRemove={() => setMinPriceStr("")}
                      />
                    )}
                    {maxPriceStr !== "" && (
                      <ActiveChip
                        key="max-price"
                        label={`Do ${maxPriceStr} zł`}
                        onRemove={() => setMaxPriceStr("")}
                      />
                    )}
                    {minRating > 0 && (
                      <ActiveChip
                        key="rating"
                        label={`${minRating}★+`}
                        onRemove={() => setMinRating(0)}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Product grid */}
            {filtered.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <div className="flex flex-col gap-4">
                {/* Hero row: featured card (left) + 4 cards (right 2x2) */}
                {featured && (
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Featured */}
                    <motion.div
                      key={featured.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="md:w-[50%] xl:w-[45%] shrink-0"
                    >
                      <ProductCard product={featured} animate={false} featured={true} />
                    </motion.div>

                    {/* 2×2 side cards */}
                    {sideCards.length > 0 && (
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <AnimatePresence mode="popLayout">
                          {sideCards.map((product, i) => (
                            <motion.div
                              key={product.id}
                              layout
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.35, ease: EASE, delay: i * 0.05 }}
                            >
                              <ProductCard product={product} animate={false} featured={false} />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )}

                {/* Remaining cards — 4 column grid */}
                {restCards.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    <AnimatePresence mode="popLayout">
                      {restCards.map((product, i) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.35, ease: EASE, delay: Math.min(i * 0.04, 0.2) }}
                        >
                          <ProductCard product={product} animate={false} featured={false} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
