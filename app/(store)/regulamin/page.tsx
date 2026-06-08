import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Regulamin Sklepu — Digi by Sabriel",
  description: "Regulamin sklepu internetowego Digi by Sabriel. Zasady zakupów, dostawy i korzystania ze sklepu.",
  robots: { index: true, follow: true },
};

const SECTIONS: LegalSection[] = [
  {
    id: "postanowienia-ogolne",
    title: "Postanowienia ogólne",
    content: [
      {
        type: "paragraph",
        text: "Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego prowadzonego pod adresem digibysabriel.pl, w tym zasady składania zamówień, realizacji zakupów oraz praw i obowiązków stron.",
      },
      {
        type: "paragraph",
        text: "Sprzedawcą jest właściciel sklepu Digi by Sabriel, prowadzący działalność na terytorium Rzeczypospolitej Polskiej.",
      },
      { type: "contact", label: "E-mail", value: "kontakt@digibysabriel.pl", href: "mailto:kontakt@digibysabriel.pl" },
      { type: "contact", label: "Strona", value: "digibysabriel.pl" },
      {
        type: "paragraph",
        text: "Regulamin stosuje się do Konsumentów w rozumieniu art. 22¹ Kodeksu cywilnego oraz do przedsiębiorców, z zastrzeżeniem odmiennych postanowień dotyczących ochrony konsumenckiej.",
      },
    ],
  },
  {
    id: "definicje",
    title: "Definicje",
    content: [
      {
        type: "list",
        items: [
          "Sklep — sklep internetowy prowadzony pod adresem digibysabriel.pl.",
          "Sprzedawca — właściciel sklepu Digi by Sabriel.",
          "Kupujący / Klient — osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, która składa zamówienie w Sklepie.",
          "Konsument — osoba fizyczna dokonująca czynności prawnej niezwiązanej bezpośrednio z jej działalnością gospodarczą lub zawodową (art. 22¹ k.c.).",
          "Produkt cyfrowy / Treść cyfrowa — niematerialny plik do pobrania (m.in. grafika w formatach PDF, PNG, JPG, SVG lub paczka ZIP) dostępny w Sklepie.",
          "Zamówienie — oświadczenie woli Kupującego złożone za pośrednictwem formularza w Sklepie, zmierzające do zawarcia Umowy sprzedaży.",
          "Umowa sprzedaży — umowa zawarta na odległość, na podstawie której Sprzedawca zobowiązuje się przenieść własność Produktu cyfrowego i umożliwić jego pobranie, a Kupujący zobowiązuje się zapłacić cenę.",
          "Konto Klienta — indywidualne konto w Sklepie, umożliwiające dostęp do historii zamówień i plików do pobrania.",
        ],
      },
    ],
  },
  {
    id: "rejestracja-konto",
    title: "Rejestracja i konto klienta",
    content: [
      {
        type: "paragraph",
        text: "Korzystanie ze Sklepu, w tym składanie zamówień i dostęp do pobranych plików, wymaga rejestracji konta.",
      },
      {
        type: "list",
        items: [
          "Rejestracja jest bezpłatna i dobrowolna.",
          "Kupujący zobowiązuje się podać prawdziwe i aktualne dane.",
          "Login i hasło mają charakter poufny. Kupujący ponosi odpowiedzialność za udostępnienie danych osobom trzecim.",
          "Sprzedawca może usunąć konto, jeśli Kupujący narusza postanowienia Regulaminu.",
        ],
      },
    ],
  },
  {
    id: "skladanie-zamowien",
    title: "Składanie i realizacja zamówień",
    content: [
      {
        type: "paragraph",
        text: "Zamówienia można składać 24 godziny na dobę, 7 dni w tygodniu przez stronę digibysabriel.pl.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Dodaj wybrany produkt do koszyka.",
          "Przejdź do strony koszyka i kliknij Przejdź do kasy.",
          "Uzupełnij dane (adres e-mail, dane do faktury jeśli wymagane) i wybierz metodę płatności.",
          "Zaakceptuj Regulamin i Politykę Prywatności.",
          "Potwierdź zamówienie przyciskiem Zamawiam i płacę — to moment złożenia oferty zakupu.",
          "Po zaksięgowaniu płatności otrzymasz e-mail z potwierdzeniem i linkiem do pobrania pliku.",
        ],
      },
      {
        type: "highlight",
        text: "Umowa sprzedaży zostaje zawarta z chwilą otrzymania przez Kupującego e-maila z potwierdzeniem zamówienia i dostępem do pliku. Pliki są dostępne do pobrania z poziomu konta klienta przez 30 dni.",
      },
    ],
  },
  {
    id: "ceny-platnosci",
    title: "Ceny i metody płatności",
    content: [
      {
        type: "paragraph",
        text: "Wszystkie ceny podane w Sklepie są cenami brutto i wyrażone w złotych polskich (PLN). Sprzedawca jest zwolniony z VAT na podstawie art. 113 ust. 1 ustawy o VAT lub zgodnie z obowiązującymi przepisami.",
      },
      {
        type: "paragraph",
        text: "Dostępne metody płatności:",
      },
      {
        type: "list",
        items: [
          "Karty płatnicze (Visa, Mastercard) za pośrednictwem operatora płatności.",
          "BLIK — szybka płatność mobilna.",
          "Przelewy bankowe online (np. Przelewy24, PayU).",
          "PayPal.",
        ],
      },
      {
        type: "paragraph",
        text: "Płatność należy uiścić niezwłocznie po złożeniu zamówienia. Nieopłacone zamówienie zostaje anulowane po 24 godzinach.",
      },
    ],
  },
  {
    id: "dostawa-produktow",
    title: "Dostawa produktów cyfrowych",
    content: [
      {
        type: "paragraph",
        text: "Sklep sprzedaje wyłącznie produkty cyfrowe — pliki do pobrania. Nie realizujemy fizycznej wysyłki. Po zaksięgowaniu płatności:",
      },
      {
        type: "list",
        items: [
          "Na podany adres e-mail wysyłamy potwierdzenie z linkiem do pobrania.",
          "Plik jest dostępny do pobrania w sekcji Moje zamówienia w koncie klienta przez 30 dni od daty zakupu.",
          "Każdy plik można pobrać wielokrotnie w czasie obowiązywania dostępu.",
          "Pliki dostarczane są w formatach wskazanych w opisie produktu (PDF, PNG, JPG, SVG, ZIP).",
        ],
      },
      {
        type: "highlight",
        text: "Jeśli nie dotarł do Ciebie e-mail z linkiem, sprawdź folder spam. Jeśli nadal nie możesz pobrać pliku, napisz na kontakt@digibysabriel.pl — sprawę rozwiążemy w ciągu 24 godzin.",
      },
    ],
  },
  {
    id: "prawa-autorskie",
    title: "Prawa autorskie i licencja",
    content: [
      {
        type: "paragraph",
        text: "Wszystkie produkty dostępne w Sklepie są chronione prawem autorskim na podstawie ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych.",
      },
      {
        type: "paragraph",
        text: "Zakup produktu cyfrowego oznacza nabycie licencji niewyłącznej na korzystanie z pliku wyłącznie na użytek prywatny i niekomercyjny, w tym:",
      },
      {
        type: "list",
        items: [
          "Drukowanie dla własnych potrzeb w nieograniczonej liczbie egzemplarzy.",
          "Wykorzystanie w scrapbookingu, plannerach i kartach osobistych.",
          "Druk na własne prezenty i pamiątki.",
        ],
      },
      {
        type: "subheading",
        text: "Zabronione jest:",
      },
      {
        type: "list",
        items: [
          "Odsprzedaż pliku w formie cyfrowej lub fizycznej.",
          "Udostępnianie pliku osobom trzecim (sharing) — każda osoba musi nabyć własną licencję.",
          "Modyfikowanie i odsprzedaż zmodyfikowanej wersji.",
          "Wykorzystanie komercyjne (produkcja i sprzedaż towarów z nadrukowaną grafiką) bez odrębnej licencji komercyjnej.",
        ],
      },
      {
        type: "paragraph",
        text: "W celu uzyskania licencji komercyjnej prosimy o kontakt mailowy.",
      },
    ],
  },
  {
    id: "reklamacje",
    title: "Reklamacje",
    content: [
      {
        type: "paragraph",
        text: "Sprzedawca odpowiada za zgodność produktu cyfrowego z umową na podstawie przepisów ustawy z dnia 30 maja 2014 r. o prawach konsumenta (art. 43h-43q w brzmieniu obowiązującym od 1 stycznia 2023 r.).",
      },
      {
        type: "paragraph",
        text: "Reklamację można złożyć, jeśli:",
      },
      {
        type: "list",
        items: [
          "Plik nie pobiera się lub jest uszkodzony.",
          "Pobrany plik jest inny niż opisany (błędna zawartość).",
          "Produkt nie posiada cech wskazanych w opisie lub próbce.",
        ],
      },
      {
        type: "paragraph",
        text: "Reklamację należy złożyć e-mailem na adres kontakt@digibysabriel.pl, podając: numer zamówienia, opis problemu i — jeśli to możliwe — zrzut ekranu lub opis błędu.",
      },
      {
        type: "paragraph",
        text: "Reklamacja zostanie rozpatrzona w ciągu 14 dni kalendarzowych od jej otrzymania. O wyniku poinformuję Cię e-mailem.",
      },
    ],
  },
  {
    id: "odstapienie",
    title: "Prawo odstąpienia od umowy",
    content: [
      {
        type: "paragraph",
        text: "Konsumentowi przysługuje prawo odstąpienia od umowy zawartej na odległość w terminie 14 dni bez podania przyczyny (art. 27 ustawy o prawach konsumenta).",
      },
      {
        type: "subheading",
        text: "Wyłączenie prawa odstąpienia dla produktów cyfrowych",
      },
      {
        type: "paragraph",
        text: "Na podstawie art. 38 pkt 13 ustawy o prawach konsumenta prawo odstąpienia od umowy nie przysługuje Konsumentowi w odniesieniu do umów o dostarczanie treści cyfrowych niedostarczanych na nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą Konsumenta przed upływem terminu do odstąpienia od umowy i po poinformowaniu go przez przedsiębiorcę o utracie prawa odstąpienia.",
      },
      {
        type: "highlight",
        text: "Klikając Zamawiam i płacę wyrażasz wyraźną zgodę na natychmiastowe dostarczenie treści cyfrowej i przyjmujesz do wiadomości, że po dostarczeniu pliku utracisz prawo odstąpienia od umowy. Zostaniesz o tym wyraźnie poinformowany w procesie zakupowym.",
      },
      {
        type: "paragraph",
        text: "Prawo odstąpienia zachowujesz w pełni, jeśli do pobrania pliku jeszcze nie doszło (zamówienie opłacone, lecz dostęp nieaktywowany). W takim przypadku złóż oświadczenie e-mailem przed pobraniem pliku.",
      },
    ],
  },
  {
    id: "postanowienia-koncowe",
    title: "Postanowienia końcowe",
    content: [
      {
        type: "paragraph",
        text: "W sprawach nieuregulowanych w niniejszym Regulaminie zastosowanie mają przepisy polskiego prawa, w szczególności: Kodeks cywilny (ustawa z dnia 23 kwietnia 1964 r.), ustawa o prawach konsumenta (z dnia 30 maja 2014 r.) oraz ustawa o świadczeniu usług drogą elektroniczną (z dnia 18 lipca 2002 r.).",
      },
      {
        type: "paragraph",
        text: "Wszelkie spory wynikłe z Umowy sprzedaży rozpatrywane będą przez sąd właściwy dla siedziby Sprzedawcy, z zastrzeżeniem, że Konsument może wytoczyć powództwo przed sąd właściwy ze względu na swoje miejsce zamieszkania.",
      },
      {
        type: "paragraph",
        text: "Konsument ma prawo do pozasądowego rozwiązywania sporów. Szczegółowe informacje o dostępnych procedurach znajdziesz na stronie uokik.gov.pl. Platforma ODR dostępna jest pod adresem ec.europa.eu/consumers/odr.",
      },
      {
        type: "paragraph",
        text: "Sprzedawca zastrzega sobie prawo do zmiany Regulaminu. O zmianach zarejestrowanych Klientów poinformuję e-mailem z co najmniej 14-dniowym wyprzedzeniem. Zamówienia złożone przed datą wejścia zmian w życie realizowane są na dotychczasowych warunkach.",
      },
    ],
  },
];

export default function Regulamin() {
  return (
    <LegalPage
      label="Informacje prawne"
      title="Regulamin Sklepu"
      subtitle="Zasady korzystania ze sklepu Digi by Sabriel. Prosimy o zapoznanie się przed dokonaniem zakupu."
      effectiveDate="7 czerwca 2026 r."
      sections={SECTIONS}
    />
  );
}
