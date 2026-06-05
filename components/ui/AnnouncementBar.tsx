"use client";

const messages = [
  "🎁 Darmowe pobieranie po zakupie",
  "✨ Ponad 300 unikalnych grafik",
  "⭐ Ocena 4.9/5 od 500+ klientek",
  "📥 300 DPI — jakość profesjonalnego druku",
];

export default function AnnouncementBar() {
  const desktopContent = messages.join(" · ");
  const marqueeContent = messages.join("   ·   ");

  return (
    <div
      role="banner"
      aria-label="Informacje o sklepie"
      className="bg-[#2a221b] text-white py-2 overflow-hidden"
    >
      {/* Desktop: all messages centered */}
      <p className="hidden md:block text-center text-xs font-normal font-sans">
        {desktopContent}
      </p>

      {/* Mobile: animated marquee ticker */}
      <div className="flex md:hidden overflow-hidden">
        <span className="animate-marquee whitespace-nowrap text-xs font-normal font-sans pr-8">
          {marqueeContent}
        </span>
        <span
          className="animate-marquee whitespace-nowrap text-xs font-normal font-sans pr-8"
          aria-hidden="true"
        >
          {marqueeContent}
        </span>
      </div>
    </div>
  );
}
