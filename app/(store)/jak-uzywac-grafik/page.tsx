import SectionLabel from "@/components/ui/SectionLabel";
import GuideStep from "@/components/ui/GuideStep";
import PrinterGuide from "@/components/ui/PrinterGuide";
import GuideFaqAccordion from "@/components/ui/GuideFaqAccordion";

/* ─── Inline CSS diagram components ──────────────────────────────────── */

function DiagramLogin() {
  return (
    <div
      className="w-full max-w-70 bg-white rounded-2xl shadow-md border border-[#ffeade] p-5 mx-auto"
      aria-hidden="true"
    >
      <div className="flex items-center justify-center mb-5">
        <div className="relative w-10 h-10 flex items-center justify-center">
          {/* Lock body */}
          <div className="absolute bottom-0 w-8 h-5 bg-[#944a00] rounded-b-lg rounded-t-sm" />
          {/* Lock shackle */}
          <div
            className="absolute top-0 w-5 h-5 border-[3px] border-[#944a00] rounded-t-full animate-lock-open"
            style={{
              borderBottomColor: "transparent",
              transformOrigin: "100% 100%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </div>
      <div className="space-y-2.5">
        <div className="h-9 bg-[#fff1ea] rounded-lg border border-[#ddc1af] px-3 flex items-center">
          <span className="text-xs text-[#8a7263]">adres@email.pl</span>
        </div>
        <div className="h-9 bg-[#fff1ea] rounded-lg border border-[#ddc1af] px-3 flex items-center">
          <span className="text-xs text-[#8a7263] tracking-widest">••••••••</span>
        </div>
        <div
          className="h-9 bg-[#944a00] rounded-lg text-white text-xs font-bold flex items-center justify-center animate-cursor-click"
          style={{ animationDelay: "0.5s" }}
        >
          Zaloguj się →
        </div>
      </div>
    </div>
  );
}

function DiagramOrders() {
  return (
    <div
      className="w-full max-w-70 bg-white rounded-2xl shadow-md border border-[#ffeade] overflow-hidden mx-auto"
      aria-hidden="true"
    >
      <div className="bg-[#ffeade] px-4 py-2.5 border-b border-[#ddc1af]">
        <span className="text-xs font-bold text-[#944a00]">Moje zamówienia</span>
      </div>
      {[
        { label: "Zamówienie #1203", date: "12 maja", active: false },
        { label: "Zamówienie #1204", date: "3 czerwca", active: true },
        { label: "Zamówienie #1205", date: "5 czerwca", active: false },
      ].map((row, i) => (
        <div
          key={i}
          className={`flex items-center justify-between px-4 py-3 border-b border-[#f3dfd2] last:border-0 transition-colors ${
            row.active ? "animate-row-highlight" : ""
          }`}
        >
          <div>
            <p className="text-xs font-semibold text-[#241912]">{row.label}</p>
            <p className="text-[10px] text-[#8a7263]">{row.date}</p>
          </div>
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
              row.active
                ? "bg-green-100 text-green-700"
                : "bg-[#f3dfd2] text-[#8a7263]"
            }`}
          >
            {row.active ? "▼ Pobierz" : "Gotowe"}
          </span>
        </div>
      ))}
    </div>
  );
}

function DiagramDownload() {
  return (
    <div
      className="w-full max-w-70 bg-white rounded-2xl shadow-md border border-[#ffeade] p-5 mx-auto"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-12 bg-[#ffeade] rounded-lg border border-[#ddc1af] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#944a00]" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#241912] truncate">grafika_sabriel.pdf</p>
          <p className="text-[10px] text-[#8a7263]">2,4 MB</p>
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-3 bg-[#ffeade] rounded-full overflow-hidden mb-2.5">
        <div className="h-full bg-[#944a00] rounded-full animate-progress-fill" />
      </div>
      <p className="text-center text-[10px] text-[#564335]">Pobieranie… zaczekaj chwilę</p>
      {/* Download icon */}
      <div className="flex justify-center mt-4">
        <div className="w-9 h-9 rounded-full bg-[#ffeade] flex items-center justify-center border border-[#ddc1af] animate-float">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#944a00]" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function DiagramSaved() {
  return (
    <div
      className="w-full max-w-70 bg-white rounded-2xl shadow-md border border-[#ffeade] p-6 mx-auto flex flex-col items-center gap-4"
      aria-hidden="true"
    >
      {/* Folder with file dropping in */}
      <div className="relative h-20 w-24 flex items-end justify-center">
        {/* Folder body */}
        <div className="absolute bottom-0 w-20 h-14 bg-[#f27f0d]/25 rounded-b-xl rounded-tr-xl border-2 border-[#f27f0d]/50" />
        {/* Folder tab */}
        <div className="absolute bottom-13 left-0 w-10 h-4 bg-[#f27f0d]/25 rounded-tl-lg border-2 border-[#f27f0d]/50 border-b-0" />
        {/* File sliding into folder */}
        <div className="absolute top-0 animate-file-drop" style={{ left: "50%", transform: "translateX(-50%)" }}>
          <div className="w-9 h-11 bg-white rounded-md border-2 border-[#ddc1af] shadow-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#944a00]" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
        </div>
      </div>
      {/* Checkmark */}
      <div className="animate-check-appear">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-300 shadow-sm">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={3}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
      <p className="text-sm font-semibold text-[#241912] animate-check-appear" style={{ animationDelay: "0.2s" }}>
        Plik zapisany!
      </p>
    </div>
  );
}

/* ─── Format cards data ───────────────────────────────────────────────── */

const FORMATS = [
  {
    ext: "PDF",
    color: "#e53e3e",
    bg: "#fff5f5",
    border: "#fed7d7",
    title: "Do druku",
    description:
      "Najlepszy format do drukowania. Otworzysz go bezpłatnym Adobe Reader. Zachowuje idealne proporcje i jakość.",
    recommended: true,
  },
  {
    ext: "PNG",
    color: "#2b6cb0",
    bg: "#ebf8ff",
    border: "#bee3f8",
    title: "Grafika bez tła",
    description:
      "Plik graficzny z przezroczystym tłem. Idealny do wklejenia na inne projekty w Canvie lub Photoshopie.",
    recommended: false,
  },
  {
    ext: "JPG",
    color: "#285e61",
    bg: "#e6fffa",
    border: "#b2f5ea",
    title: "Zdjęcie wysokiej jakości",
    description:
      "Klasyczny format zdjęciowy. Otworzysz go w każdym programie — na telefonie, komputerze czy tablecie.",
    recommended: false,
  },
  {
    ext: "ZIP",
    color: "#744210",
    bg: "#fffff0",
    border: "#fefcbf",
    title: "Paczka plików",
    description:
      "Spakowany folder z kilkoma plikami. Aby go otworzyć: kliknij prawym przyciskiem → \"Wyodrębnij wszystko\".",
    recommended: false,
  },
  {
    ext: "SVG",
    color: "#276749",
    bg: "#f0fff4",
    border: "#c6f6d5",
    title: "Wektorowy",
    description:
      "Grafika którą można powiększyć do dowolnego rozmiaru bez utraty jakości. Do edycji w Illustratorze lub Inkscape.",
    recommended: false,
  },
];

/* ─── FAQ data ────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    q: "Grafika wygląda rozmyto po wydrukowaniu — co robię źle?",
    a: "Najprawdopodobniej drukujesz w zbyt niskiej jakości. Wejdź w ustawienia drukarki (Ctrl+P → Właściwości) i zmień jakość na \"Najlepsza\" lub \"Zdjęcia\". Sprawdź też, czy wybrałeś właściwy typ papieru — papier fotograficzny daje wyraźnie lepsze efekty niż zwykły biurowy.",
  },
  {
    q: "Nie widzę przycisku \"Pobierz\" w moim zamówieniu — co się stało?",
    a: "Link do pobrania jest aktywny przez 30 dni od zakupu i możesz pobrać plik wielokrotnie. Jeśli nie widzisz przycisku — sprawdź czy jesteś zalogowana na to samo konto, na którym robiłaś zakup. Nadal nie widzisz? Napisz do mnie na kontakt@digibysabriel.pl — rozwiążę problem w ciągu kilku godzin.",
  },
  {
    q: "Jak otworzyć plik ZIP?",
    a: "Kliknij prawym przyciskiem myszy na plik ZIP, a następnie wybierz \"Wyodrębnij wszystko\" (Windows) lub po prostu kliknij dwukrotnie (Mac). Wszystkie pliki graficzne znajdziesz w nowym folderze który się otworzy.",
  },
  {
    q: "Czy mogę wydrukować grafikę w drukarni / punktcie usługowym?",
    a: "Oczywiście! Grafiki są w rozdzielczości 300 DPI, co spełnia standardy profesjonalnych drukarni. Po prostu zanieś lub prześlij plik (najlepiej PDF lub PNG) do wybranej drukarni i poproś o wydruk fotograficzny lub na papierze kredowym.",
  },
];

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function JakUzywacGrafikPage() {
  return (
    <main aria-labelledby="page-heading" className="bg-[#fff8f5]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20">
        {/* Background blobs */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-96 h-96 bg-[#f27f0d]/8 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-12 -left-16 w-72 h-72 bg-pink-200/15 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl">
            <SectionLabel>Instrukcja obsługi</SectionLabel>

            <h1
              id="page-heading"
              className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-[#241912] leading-tight"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Jak używać&nbsp;
              <span
                className="animate-gradient"
                style={{
                  backgroundImage: "linear-gradient(135deg, #944a00, #f27f0d, #944a00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% 200%",
                }}
              >
                grafik?
              </span>
            </h1>

            <p className="mt-5 text-xl text-[#564335] leading-relaxed max-w-xl">
              Wszystko krok po kroku — prosto i zrozumiale. Pobierzesz i wydrukujesz
              swoją grafikę w najlepszej jakości, nawet jeśli rzadko korzystasz z komputera.
            </p>

            {/* Quick nav pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#pobieranie"
                className="inline-flex items-center gap-2 bg-[#944a00] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#713700] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Jak pobrać?
              </a>
              <a
                href="#drukowanie"
                className="inline-flex items-center gap-2 bg-white text-[#944a00] border-2 border-[#944a00]/30 px-5 py-2.5 rounded-full text-sm font-bold hover:border-[#944a00] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                Jak drukować?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1: Pobieranie ── */}
      <section
        id="pobieranie"
        aria-labelledby="pobieranie-heading"
        className="w-full py-16 md:py-24 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Section header */}
          <div className="mb-14">
            <SectionLabel>Krok po kroku</SectionLabel>
            <h2
              id="pobieranie-heading"
              className="mt-4 text-3xl sm:text-4xl font-bold text-[#241912]"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Jak pobrać zakupioną grafikę?
            </h2>
            <p className="mt-3 text-lg text-[#564335] max-w-xl">
              Po zakupie Twoje pliki czekają na Ciebie w koncie — możesz je pobierać
              wielokrotnie przez 30 dni.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-20">
            <GuideStep
              number="01"
              title="Zaloguj się na swoje konto"
              description={`Kliknij przycisk „Konto" w prawym górnym rogu strony. Wpisz adres e-mail i hasło, którymi rejestrowałaś się przy zakupie, i kliknij „Zaloguj się".`}
            >
              <DiagramLogin />
            </GuideStep>

            <div className="border-t border-[#f3dfd2]" aria-hidden="true" />

            <GuideStep
              number="02"
              title={`Przejdź do „Moje zamówienia"`}
              description={`Po zalogowaniu kliknij swoje imię lub ikonę w menu, a potem wybierz „Moje zamówienia". Zobaczysz listę wszystkich zakupów.`}
              flip
            >
              <DiagramOrders />
            </GuideStep>

            <div className="border-t border-[#f3dfd2]" aria-hidden="true" />

            <GuideStep
              number="03"
              title={`Kliknij przycisk „Pobierz"`}
              description={`Przy każdym zamówieniu zobaczysz zielony przycisk „Pobierz". Kliknij go — przeglądarka automatycznie zacznie pobierać plik na Twój komputer.`}
            >
              <DiagramDownload />
            </GuideStep>

            <div className="border-t border-[#f3dfd2]" aria-hidden="true" />

            <GuideStep
              number="04"
              title="Gotowe — plik jest na Twoim komputerze!"
              description={`Plik zapisuje się w folderze „Pobrane" (lub „Downloads"). Znajdziesz go otwierając Eksplorator plików i klikając „Pobrane" po lewej stronie.`}
              flip
            >
              <DiagramSaved />
            </GuideStep>
          </div>

          {/* Tip box */}
          <div className="mt-14 bg-[#ffeade] rounded-2xl px-6 py-5 border border-[#f3dfd2] flex gap-4 items-start">
            <span className="text-2xl shrink-0" aria-hidden="true">💡</span>
            <div>
              <p className="font-bold text-[#241912] mb-1">Nie możesz znaleźć pliku?</p>
              <p className="text-[#564335] text-base leading-relaxed">
                Najczęściej pliki lądują w folderze <strong>Pobrane</strong> (po lewej stronie w oknie Mój komputer).
                Możesz też nacisnąć <strong>Ctrl+J</strong> w przeglądarce — otworzy się lista ostatnio pobranych plików.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Formaty plików ── */}
      <section
        aria-labelledby="formaty-heading"
        className="w-full py-16 md:py-20 bg-[#ffeade]/40"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10">
            <SectionLabel>Typy plików</SectionLabel>
            <h2
              id="formaty-heading"
              className="mt-4 text-3xl sm:text-4xl font-bold text-[#241912]"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Jakie pliki otrzymasz?
            </h2>
            <p className="mt-3 text-lg text-[#564335] max-w-xl">
              W zależności od produktu, Twoje zamówienie może zawierać jeden lub kilka formatów.
              Oto co każdy z nich oznacza.
            </p>
          </div>

          <ul
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            role="list"
            aria-label="Dostępne formaty plików"
          >
            {FORMATS.map((f) => (
              <li
                key={f.ext}
                className="relative bg-white rounded-2xl border-2 p-5 shadow-sm hover:-translate-y-0.5 transition-transform duration-300"
                style={{ borderColor: f.border }}
              >
                {f.recommended && (
                  <span className="absolute -top-2.5 -right-2.5 bg-[#944a00] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    Polecany
                  </span>
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 font-black text-sm tracking-wide"
                  style={{ backgroundColor: f.bg, color: f.color }}
                >
                  {f.ext}
                </div>
                <h3 className="font-bold text-[#241912] mb-1.5 text-base">{f.title}</h3>
                <p className="text-sm text-[#564335] leading-relaxed">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Section 3: Drukowanie ── */}
      <section
        id="drukowanie"
        aria-labelledby="drukowanie-heading"
        className="w-full py-16 md:py-24 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <SectionLabel>Drukowanie</SectionLabel>
            <h2
              id="drukowanie-heading"
              className="mt-4 text-3xl sm:text-4xl font-bold text-[#241912]"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Jak wydrukować w najlepszej jakości?
            </h2>
            <p className="mt-3 text-lg text-[#564335] max-w-xl">
              Wszystkie grafiki mają 300 DPI — to standard profesjonalnego druku.
              Wystarczy ustawić drukarkę poprawnie, a efekt będzie zachwycający.
            </p>
          </div>

          {/* General tips */}
          <ul
            className="grid sm:grid-cols-3 gap-5 mb-14"
            role="list"
            aria-label="Ogólne wskazówki dotyczące drukowania"
          >
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                ),
                color: "text-[#944a00]",
                bg: "bg-[#ffeade]",
                title: `Ustaw jakość na „Najlepsza"`,
                desc: `W każdej drukarce znajdziesz ustawienie jakości wydruku. Zawsze wybierz „Najlepsza" lub „Zdjęcia" — nigdy „Robocza".`,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
                color: "text-[#006b5f]",
                bg: "bg-[#e6fffa]",
                title: "Wybierz właściwy papier",
                desc: "Do kolorowych grafik najlepszy jest papier fotograficzny błyszczący lub matowy. Wydruk na zwykłym papierze będzie znacznie bledszy.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                color: "text-[#006398]",
                bg: "bg-[#ebf8ff]",
                title: "Drukuj w kolorze",
                desc: "Sprawdź czy drukarka nie jest przestawiona na \"Skala szarości\". Drukowanie kolorowe powinno być domyślnie włączone.",
              },
            ].map((tip, i) => (
              <li
                key={i}
                className="bg-white rounded-2xl border border-[#f3dfd2] p-5 shadow-sm flex gap-4 items-start"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${tip.bg} ${tip.color} flex items-center justify-center shrink-0`}
                >
                  {tip.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#241912] mb-1.5 text-base">{tip.title}</h3>
                  <p className="text-sm text-[#564335] leading-relaxed">{tip.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Printer guide */}
          <div className="bg-[#fff8f5] rounded-3xl border border-[#f3dfd2] p-6 md:p-10 shadow-sm">
            <h3
              className="text-xl md:text-2xl font-bold text-[#241912] mb-2"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Wybierz swoją markę drukarki
            </h3>
            <p className="text-[#564335] mb-8 text-base">
              Kliknij nazwę swojej drukarki, a zobaczysz dokładną instrukcję krok po kroku.
            </p>
            <PrinterGuide />
          </div>
        </div>
      </section>

      {/* ── Section 4: FAQ ── */}
      <section
        aria-labelledby="faq-heading"
        className="w-full py-16 md:py-24 bg-[#ffeade]/40"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            {/* Left */}
            <div className="lg:sticky lg:top-28 self-start">
              <SectionLabel>Pomoc</SectionLabel>
              <h2
                id="faq-heading"
                className="mt-4 text-4xl font-bold text-[#241912] leading-tight"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                Masz pytanie?
              </h2>
              <p className="mt-4 text-[#564335] text-base leading-relaxed">
                Tutaj znajdziesz odpowiedzi na najczęstsze pytania.
                Nadal nie wiesz co zrobić?
              </p>
              <a
                href="mailto:kontakt@digibysabriel.pl"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#944a00] hover:text-[#713700] transition-colors underline underline-offset-4 decoration-[#944a00]/30"
              >
                Napisz do mnie
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Right — accordion */}
            <GuideFaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

    </main>
  );
}

