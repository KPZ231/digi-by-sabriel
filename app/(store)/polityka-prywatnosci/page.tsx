import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Polityka Prywatności — Digi by Sabriel",
  description: "Polityka prywatności sklepu Digi by Sabriel. Dowiedz się, jakie dane zbieramy i jak je chronimy.",
  robots: { index: true, follow: true },
};

const SECTIONS: LegalSection[] = [
  {
    id: "administrator",
    title: "Administrator danych osobowych",
    content: [
      {
        type: "paragraph",
        text: "Administratorem Twoich danych osobowych jest właściciel sklepu internetowego Digi by Sabriel, prowadzący działalność pod adresem digibysabriel.pl.",
      },
      { type: "contact", label: "E-mail", value: "kontakt@digibysabriel.pl", href: "mailto:kontakt@digibysabriel.pl" },
      {
        type: "highlight",
        text: "W sprawach dotyczących ochrony danych osobowych możesz skontaktować się ze mną pod powyższym adresem e-mail. Odpowiem w ciągu 72 godzin.",
      },
    ],
  },
  {
    id: "jakie-dane",
    title: "Jakie dane zbieramy i skąd",
    content: [
      {
        type: "paragraph",
        text: "W zależności od sposobu korzystania z serwisu przetwarzam następujące kategorie danych osobowych:",
      },
      {
        type: "subheading",
        text: "Dane podawane przy rejestracji i składaniu zamówienia",
      },
      {
        type: "list",
        items: [
          "Imię i nazwisko lub pseudonim",
          "Adres e-mail",
          "Hasło (przechowywane w postaci zaszyfrowanej, nigdy w postaci jawnej)",
          "Adres IP i dane techniczne urządzenia",
        ],
      },
      {
        type: "subheading",
        text: "Dane zbierane automatycznie",
      },
      {
        type: "list",
        items: [
          "Adres IP, typ przeglądarki i systemu operacyjnego",
          "Data i godzina odwiedzin oraz przeglądane podstrony",
          "Dane sesji i pliki cookies (szczegóły w Polityce Cookies)",
        ],
      },
    ],
  },
  {
    id: "cel-podstawa",
    title: "Cel i podstawa prawna przetwarzania",
    content: [
      {
        type: "paragraph",
        text: "Przetwarzam Twoje dane wyłącznie w konkretnych, wyraźnie określonych celach. Poniżej znajdziesz zestawienie celów wraz z podstawami prawnymi (art. 6 RODO):",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Realizacja zamówienia i dostarczenie produktów cyfrowych — art. 6 ust. 1 lit. b RODO (wykonanie umowy).",
          "Obsługa konta klienta i historii zamówień — art. 6 ust. 1 lit. b RODO (wykonanie umowy).",
          "Wystawianie dokumentów sprzedaży (faktur/paragonów) i wypełnianie obowiązków podatkowych — art. 6 ust. 1 lit. c RODO (obowiązek prawny).",
          "Dochodzenie lub obrona roszczeń — art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes).",
          "Wysyłka newslettera, jeśli wyraziłaś/wyraziłeś zgodę — art. 6 ust. 1 lit. a RODO (zgoda). Zgodę możesz wycofać w każdej chwili.",
          "Analityka serwisu i poprawa jego działania — art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes).",
        ],
      },
    ],
  },
  {
    id: "czas-przechowywania",
    title: "Czas przechowywania danych",
    content: [
      {
        type: "paragraph",
        text: "Dane osobowe są przechowywane przez okres niezbędny do realizacji celu, w którym zostały zebrane:",
      },
      {
        type: "list",
        items: [
          "Dane zamówień i dokumentów sprzedaży — przez 5 lat od końca roku podatkowego, w którym powstał obowiązek podatkowy (wymóg ustawy o rachunkowości).",
          "Dane konta klienta — do czasu usunięcia konta lub cofnięcia zgody, nie krócej jednak niż do upływu terminu przedawnienia roszczeń (zazwyczaj 3 lata).",
          "Dane subskrypcji newslettera — do momentu cofnięcia zgody lub wypisania się.",
          "Logi serwera (IP, czas dostępu) — przez maksymalnie 12 miesięcy.",
        ],
      },
    ],
  },
  {
    id: "odbiorcy",
    title: "Odbiorcy danych i przekazywanie",
    content: [
      {
        type: "paragraph",
        text: "Twoje dane mogą być przekazywane następującym kategoriom podmiotów, wyłącznie w zakresie niezbędnym do realizacji zamówienia lub obowiązku prawnego:",
      },
      {
        type: "list",
        items: [
          "Operator płatności (np. Stripe, PayPal lub inny) — w celu realizacji transakcji.",
          "Dostawca hostingu i infrastruktury serwisowej — w ramach umowy powierzenia przetwarzania danych (art. 28 RODO).",
          "System mailingowy (np. Mailchimp, Brevo) — wyłącznie jeśli zapisałaś/zapisałeś się na newsletter.",
          "Organy publiczne — wyłącznie gdy wynika to z przepisów prawa (np. organy podatkowe, sądy).",
        ],
      },
      {
        type: "highlight",
        text: "Nie sprzedaję danych osobowych. Nie udostępniam ich podmiotom trzecim w celach marketingowych bez Twojej zgody.",
      },
    ],
  },
  {
    id: "prawa",
    title: "Twoje prawa jako osoby, której dane dotyczą",
    content: [
      {
        type: "paragraph",
        text: "Na podstawie RODO przysługują Ci następujące prawa. Możesz je wykonać, kontaktując się ze mną e-mailem:",
      },
      {
        type: "list",
        items: [
          "Prawo dostępu do danych (art. 15 RODO) — możesz poprosić o kopię przetwarzanych danych.",
          "Prawo do sprostowania (art. 16 RODO) — możesz żądać poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych.",
          "Prawo do usunięcia danych (art. 17 RODO) — tzw. prawo do bycia zapomnianym, z zastrzeżeniem wyjątków (np. obowiązek podatkowy).",
          "Prawo do ograniczenia przetwarzania (art. 18 RODO) — możesz zażądać wstrzymania przetwarzania w określonych sytuacjach.",
          "Prawo do przenoszenia danych (art. 20 RODO) — możesz otrzymać swoje dane w formacie nadającym się do odczytu maszynowego.",
          "Prawo do sprzeciwu (art. 21 RODO) — możesz sprzeciwić się przetwarzaniu danych opartemu na prawnie uzasadnionym interesie.",
          "Prawo do cofnięcia zgody — w każdej chwili, bez podania przyczyny (nie wpływa to na zgodność z prawem przetwarzania przed cofnięciem).",
        ],
      },
      {
        type: "paragraph",
        text: "Masz także prawo wniesienia skargi do organu nadzorczego — Prezesa Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa, uodo.gov.pl.",
      },
    ],
  },
  {
    id: "bezpieczenstwo",
    title: "Bezpieczeństwo danych",
    content: [
      {
        type: "paragraph",
        text: "Stosuję odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo przetwarzanych danych, w szczególności:",
      },
      {
        type: "list",
        items: [
          "Szyfrowanie połączeń za pomocą protokołu TLS/HTTPS.",
          "Hasła przechowywane w postaci zaszyfrowanej (hashing z solą).",
          "Ograniczony dostęp do danych wyłącznie do osób upoważnionych.",
          "Regularne aktualizacje oprogramowania serwisu.",
        ],
      },
    ],
  },
  {
    id: "zmiany",
    title: "Zmiany Polityki Prywatności",
    content: [
      {
        type: "paragraph",
        text: "Zastrzegam prawo do zmiany niniejszej Polityki Prywatności. Wszelkie zmiany będą publikowane na tej stronie z nową datą wejścia w życie. W przypadku istotnych zmian poinformuję zarejestrowanych użytkowników drogą mailową co najmniej 14 dni przed ich wejściem w życie.",
      },
    ],
  },
];

export default function PolitykaPrywatnosci() {
  return (
    <LegalPage
      label="Informacje prawne"
      title="Polityka Prywatności"
      subtitle="Twoje dane są bezpieczne. Dowiedz się, jakie informacje zbieramy, w jakim celu i jak je chronimy."
      effectiveDate="7 czerwca 2026 r."
      sections={SECTIONS}
    />
  );
}
