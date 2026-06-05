"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHeart, FaBasketShopping, FaBars, FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const NAV_LINKS = [
  { name: "Sklep", href: "/products" },
  { name: "Kategorie", href: "/category" },
  { name: "Bestsellery", href: "/products?sort=bestsellers" },
  { name: "O nas", href: "/o-mnie" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      const q = searchQuery.trim();
      if (!q) return;
      router.push(`/products?search=${encodeURIComponent(q)}`);
      setMobileOpen(false);
    },
    [searchQuery, router]
  );

  return (
    <header
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100"
      role="banner"
    >
      <div className="px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="Digi by Sabriel – strona główna"
        >
          <span className="text-primary text-3xl" aria-hidden="true">
            🌸
          </span>
          <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 hidden sm:block">
            Digi by Sabriel
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Nawigacja główna"
        >
          {NAV_LINKS.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={`font-medium transition-colors ${
                pathname === href
                  ? "text-primary border-b-2 border-primary"
                  : "text-slate-600 hover:text-primary"
              }`}
              aria-current={pathname === href ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end max-w-md">
          {/* Search – desktop */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="hidden md:flex flex-1 items-center bg-slate-50 rounded-full px-4 py-2 border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all"
          >
            <label htmlFor="search-desktop" className="sr-only">
              Szukaj produktów
            </label>
            <FaSearch className="text-slate-400 shrink-0" aria-hidden="true" />
            <input
              id="search-desktop"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj..."
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full ml-2 text-slate-700 placeholder-slate-400"
            />
          </form>

          {/* Favorites */}
          <Link
            href="/favorites"
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Ulubione"
          >
            <FaHeart className="text-slate-700 text-lg" />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Koszyk, 2 produkty"
          >
            <FaBasketShopping className="text-slate-700 text-lg" />
            <span
              className="absolute top-0 right-0 size-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full"
              aria-hidden="true"
            >
              2
            </span>
          </Link>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <FaXmark className="text-slate-700 text-xl" />
            ) : (
              <FaBars className="text-slate-700 text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-4"
        >
          {/* Mobile search */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="flex items-center bg-slate-50 rounded-full px-4 py-2 border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all"
          >
            <label htmlFor="search-mobile" className="sr-only">
              Szukaj produktów
            </label>
            <FaSearch className="text-slate-400 shrink-0" aria-hidden="true" />
            <input
              id="search-mobile"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj..."
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full ml-2 text-slate-700 placeholder-slate-400"
            />
          </form>

          {/* Mobile nav links */}
          <nav aria-label="Nawigacja mobilna">
            {NAV_LINKS.map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 border-b border-slate-100 font-medium transition-colors ${
                  pathname === href
                    ? "text-primary"
                    : "text-slate-700 hover:text-primary"
                }`}
                aria-current={pathname === href ? "page" : undefined}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
