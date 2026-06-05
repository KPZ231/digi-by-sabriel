"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Printer = "hp" | "epson" | "canon";

type PrinterData = {
  name: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  steps: { title: string; detail: string }[];
  settings: { label: string; value: string }[];
};

const PRINTERS: Record<Printer, PrinterData> = {
  hp: {
    name: "HP",
    accentColor: "#0071c5",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    steps: [
      {
        title: "Otwórz swój plik",
        detail:
          'Kliknij prawym przyciskiem myszy na pobrany plik i wybierz "Otwórz za pomocą" → "Przeglądarka PDF" lub "Zdjęcia".',
      },
      {
        title: "Naciśnij Ctrl + P",
        detail:
          "Trzymaj klawisz Ctrl i jednocześnie naciśnij literę P. Otworzy się okno drukowania.",
      },
      {
        title: "Wybierz drukarkę HP",
        detail:
          'Na liście drukarek kliknij swoją drukarkę HP. Jeśli jej nie widzisz — upewnij się, że drukarka jest włączona i podłączona.',
      },
      {
        title: 'Kliknij "Właściwości"',
        detail:
          'Obok nazwy drukarki kliknij przycisk "Właściwości drukarki" lub "Preferencje". Otworzy się dodatkowe okno ustawień.',
      },
      {
        title: 'Ustaw jakość na "Najlepsza"',
        detail:
          'W zakładce "Papier / Jakość" zmień ustawienie Jakość na "Najlepsza" lub "Drukowanie zdjęć". Nie wybieraj "Robocza" ani "Normalna".',
      },
      {
        title: "Wybierz typ papieru",
        detail:
          'W polu "Rodzaj papieru" wybierz "Papier fotograficzny błyszczący" lub "Papier Premium". Jeśli używasz zwykłego papieru, wybierz "Papier zwykły".',
      },
      {
        title: "Gotowe — drukuj!",
        detail:
          'Kliknij OK, a następnie duży przycisk "Drukuj". Drukarka zaczyna pracować — zaczekaj, aż skończy.',
      },
    ],
    settings: [
      { label: "Jakość wydruku", value: "Najlepsza / Zdjęcia" },
      { label: "Rodzaj papieru", value: "Papier foto błyszczący" },
      { label: "Tryb kolorów", value: "Kolorowy" },
      { label: "Orientacja strony", value: "Dopasuj do grafiki" },
    ],
  },
  epson: {
    name: "Epson",
    accentColor: "#003087",
    bgColor: "#f0f4ff",
    borderColor: "#c7d7f0",
    steps: [
      {
        title: "Otwórz swój plik",
        detail:
          'Kliknij prawym przyciskiem myszy na pobrany plik i wybierz "Otwórz za pomocą" → "Przeglądarka PDF" lub "Zdjęcia".',
      },
      {
        title: "Naciśnij Ctrl + P",
        detail:
          "Trzymaj klawisz Ctrl i jednocześnie naciśnij literę P. Otworzy się okno drukowania.",
      },
      {
        title: "Wybierz drukarkę Epson",
        detail:
          "Na liście kliknij swoją drukarkę Epson. Jeśli jej nie widzisz — sprawdź, czy jest włączona i podłączona kablem lub przez Wi-Fi.",
      },
      {
        title: 'Kliknij "Preferencje drukowania"',
        detail:
          'Kliknij "Preferencje drukowania" lub "Właściwości". Otworzy się okno ze ustawieniami drukarki Epson.',
      },
      {
        title: "Przesuń suwak na maksymalną jakość",
        detail:
          'W sekcji "Tryb drukowania" znajdź suwak z napisami "Szybkość" i "Jakość". Przesuń go maksymalnie w prawo — w stronę "Jakość".',
      },
      {
        title: "Wybierz typ nośnika",
        detail:
          'W polu "Typ nośnika" wybierz "Papier fotograficzny błyszczący Premium" (lub podobną nazwę z "foto" lub "photo"). To najważniejsze ustawienie dla pięknych kolorów.',
      },
      {
        title: "Gotowe — drukuj!",
        detail:
          'Kliknij OK, a następnie "Drukuj". Epson drukuje wolniej niż inne drukarki przy maksymalnej jakości — to normalne, zaczekaj cierpliwie.',
      },
    ],
    settings: [
      { label: "Suwak jakości", value: "Maksimum (prawa strona)" },
      { label: "Typ nośnika", value: "Papier foto Premium" },
      { label: "Tryb kolorów", value: "Kolor EPSON Vivid" },
      { label: "Rozdzielczość", value: "Automatyczna (max)" },
    ],
  },
  canon: {
    name: "Canon",
    accentColor: "#cc0000",
    bgColor: "#fff0f0",
    borderColor: "#fecaca",
    steps: [
      {
        title: "Otwórz swój plik",
        detail:
          'Kliknij prawym przyciskiem myszy na pobrany plik i wybierz "Otwórz za pomocą" → "Przeglądarka PDF" lub "Zdjęcia".',
      },
      {
        title: "Naciśnij Ctrl + P",
        detail:
          "Trzymaj klawisz Ctrl i jednocześnie naciśnij literę P. Otworzy się okno drukowania.",
      },
      {
        title: "Wybierz drukarkę Canon",
        detail:
          "Na liście kliknij swoją drukarkę Canon. Jeśli jej nie widzisz — upewnij się, że jest włączona i podłączona do komputera lub Wi-Fi.",
      },
      {
        title: 'Kliknij "Właściwości"',
        detail:
          'Kliknij "Właściwości" lub "Preferencje" obok nazwy drukarki Canon. Otworzy się okno Canon IJ Printer Assistant.',
      },
      {
        title: 'Ustaw jakość wydruku na "Wysoka"',
        detail:
          'W sekcji "Ustawienia główne" zmień "Jakość wydruku" na "Wysoka". Nie wybieraj "Standardowa" ani "Robocza" — różnica w jakości jest bardzo duża.',
      },
      {
        title: "Wybierz typ nośnika",
        detail:
          'W polu "Typ nośnika" wybierz papier pasujący do tego, co masz w drukarce. Najlepszy efekt daje "Papier foto Plus Błyszczący" lub "Papier foto Satyna".',
      },
      {
        title: "Gotowe — drukuj!",
        detail:
          'Kliknij OK, a następnie "Drukuj". Gratulacje — Twoja grafika wkrótce będzie gotowa!',
      },
    ],
    settings: [
      { label: "Jakość wydruku", value: "Wysoka" },
      { label: "Typ nośnika", value: "Papier foto Plus Błyszczący" },
      { label: "Drukowanie", value: "Kolorowe" },
      { label: "Układ strony", value: "Dopasuj do strony" },
    ],
  },
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function PrinterGuide() {
  const [active, setActive] = useState<Printer>("hp");
  const data = PRINTERS[active];

  return (
    <div className="w-full">
      {/* Tab buttons */}
      <div
        className="flex gap-3 mb-8 flex-wrap"
        role="tablist"
        aria-label="Wybierz markę drukarki"
      >
        {(["hp", "epson", "canon"] as Printer[]).map((p) => {
          const isActive = active === p;
          return (
            <button
              key={p}
              role="tab"
              aria-selected={isActive}
              aria-controls={`printer-panel-${p}`}
              onClick={() => setActive(p)}
              className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isActive
                  ? "text-white shadow-md scale-105"
                  : "bg-white text-[#564335] border-[#ddc1af] hover:border-[#944a00] hover:text-[#944a00]"
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: PRINTERS[p].accentColor,
                      borderColor: PRINTERS[p].accentColor,
                    }
                  : {}
              }
            >
              {PRINTERS[p].name}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id={`printer-panel-${active}`}
          role="tabpanel"
          aria-label={`Instrukcja dla drukarek ${data.name}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Steps list */}
          <div>
            <h4 className="text-base font-bold text-[#241912] mb-6">
              Kroki dla drukarki{" "}
              <span style={{ color: data.accentColor }}>{data.name}</span>
            </h4>
            <ol className="space-y-5" aria-label={`Instrukcja krok po kroku dla ${data.name}`}>
              {data.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm"
                    style={{ backgroundColor: data.accentColor }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-[#241912] text-base leading-snug">
                      {step.title}
                    </p>
                    <p className="text-[#564335] text-base leading-relaxed mt-1">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Settings panel */}
          <div className="lg:sticky lg:top-28 self-start">
            <h4 className="text-base font-bold text-[#241912] mb-6">
              Najważniejsze ustawienia
            </h4>

            {/* Mock settings dialog */}
            <div
              className="rounded-2xl border-2 overflow-hidden shadow-sm"
              style={{ backgroundColor: data.bgColor, borderColor: data.borderColor }}
            >
              {/* Dialog titlebar */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: data.borderColor, backgroundColor: data.accentColor + "18" }}
                aria-hidden="true"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-semibold text-[#564335] select-none">
                  Właściwości drukarki — {data.name}
                </span>
              </div>

              <ul className="p-5 space-y-3" role="list">
                {data.settings.map((setting, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-3 shadow-sm gap-4"
                  >
                    <span className="text-sm text-[#564335] shrink-0">{setting.label}</span>
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full text-white text-right leading-tight"
                      style={{ backgroundColor: data.accentColor }}
                    >
                      {setting.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="px-5 pb-5"
                aria-live="polite"
              >
                <p
                  className="text-sm rounded-xl px-4 py-3 text-[#564335] leading-relaxed"
                  style={{ backgroundColor: data.accentColor + "12", borderLeft: `3px solid ${data.accentColor}` }}
                >
                  💡 Nazwy ustawień mogą się nieznacznie różnić w zależności od modelu drukarki — ale zawsze szukaj słów: <strong>Jakość</strong>, <strong>Typ papieru</strong> i <strong>Kolor</strong>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
