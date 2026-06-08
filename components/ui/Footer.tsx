"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaInstagram, FaPinterest, FaTiktok, FaArrowRight } from "react-icons/fa6";

const SHOP_LINKS = [
  { name: "Sklep", href: "/products" },
  { name: "Kategorie", href: "/category" },
  { name: "Bestsellery", href: "/products?sort=bestsellers" },
  { name: "O nas", href: "/o-mnie" },
];

const ACCOUNT_LINKS = [
  { name: "Moje konto", href: "/account" },
  { name: "Historia zamówień", href: "/account/orders" },
  { name: "Moje pliki", href: "/account/downloads" },
  { name: "Ulubione", href: "/favorites" },
];

const LEGAL_LINKS = [
  { name: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { name: "Regulamin", href: "/regulamin" },
  { name: "Polityka cookies", href: "/polityka-cookies" },
  { name: "Zwroty i reklamacje", href: "/zwroty-reklamacje" },
];

const SOCIAL = [
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "Pinterest", href: "#", Icon: FaPinterest },
  { label: "TikTok", href: "#", Icon: FaTiktok },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function FooterLinkGroup({
  title,
  links,
  delay = 0,
}: {
  title: string;
  links: { name: string; href: string }[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#ffb784] mb-4">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map(({ name, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-[#d4b8a4] hover:text-[#fff8f5] transition-colors duration-200"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      aria-label="Stopka strony"
      className="relative overflow-hidden"
      style={{ background: "#1a120d" }}
    >
      {/* Decorative top border */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #944a00 30%, #c9a227 50%, #944a00 70%, transparent 100%)",
        }}
      />

      {/* Subtle warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-48 rounded-full blur-3xl opacity-20"
        style={{ background: "#944a00" }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 pt-14 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-14">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0 }}
            className="col-span-2 md:col-span-1"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-5 group"
              aria-label="Digi by Sabriel – strona główna"
            >
              <span className="text-2xl transition-transform group-hover:scale-110 duration-300" aria-hidden="true">
                🌸
              </span>
              <span
                className="text-xl font-bold text-[#fff8f5]"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                Digi by Sabriel
              </span>
            </Link>

            <p className="text-sm text-[#a8897a] leading-relaxed max-w-[220px] mb-6">
              Cyfrowe produkty tworzone z pasją — planery, grafiki i narzędzia, które upraszczają Twoje życie.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-[#3a2e26] text-[#a8897a] hover:border-[#944a00] hover:text-[#ffb784] transition-all duration-200 hover:scale-110"
                >
                  <Icon className="text-base" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Shop links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#ffb784] mb-4">
              Sklep
            </p>
            <ul className="flex flex-col gap-2.5">
              {SHOP_LINKS.map(({ name, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#d4b8a4] hover:text-[#fff8f5] transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Account links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#ffb784] mb-4">
              Konto
            </p>
            <ul className="flex flex-col gap-2.5">
              {ACCOUNT_LINKS.map(({ name, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#d4b8a4] hover:text-[#fff8f5] transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          >
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#ffb784] mb-4">
              Prawne
            </p>
            <ul className="flex flex-col gap-2.5">
              {LEGAL_LINKS.map(({ name, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#d4b8a4] hover:text-[#fff8f5] transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="h-px w-full mb-7"
          style={{ background: "linear-gradient(90deg, transparent, #3a2e26 20%, #3a2e26 80%, transparent)" }}
        />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a6358]"
        >
          <p>© {year} Digi by Sabriel. Wszelkie prawa zastrzeżone.</p>

          <a
            href="https://www.kpzsproductions.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 group hover:text-[#ffb784] transition-colors duration-200"
          >
            <span>Stworzone przez</span>
            <span className="font-semibold text-[#a8897a] group-hover:text-[#ffb784] transition-colors duration-200">
              KPZsProductions
            </span>
            <FaArrowRight
              className="text-[10px] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
