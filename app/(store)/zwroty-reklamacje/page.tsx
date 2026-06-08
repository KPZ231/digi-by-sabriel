import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Zwroty i Reklamacje — Digi by Sabriel",
  description: "Polityka zwrotów i reklamacji sklepu Digi by Sabriel. Dowiedz się, jak zgłosić reklamację lub zwrot.",
  robots: { index: true, follow: true },
};

const SECTIONS: LegalSection[] = [
  {
    id: "specyfika-produktow",
    title: "Specyfika produktów cyfrowych",
    content: [
      {
        type: "paragraph",
        text: "Digi by Sabriel sprzedaje wyłącznie treści cyfrowe (pliki do pobrania: grafiki PDF, PNG, JPG, SVG, ZIP). Nie prowadzimy sprzedaży produktów fizycznych, dlatego zwroty klasyczne polegające na odesłaniu towaru nie mają tutaj zastosowania.",
      },
      {
        type: "highlight",
        text: "W przypadku treści cyfrowych dostarczanych natychmiastowo prawo do odstąpienia od umowy jest wyłączone po dostarczeniu pliku — jeśli wyraziłaś/wyraziłeś na to zgodę podczas zakupu (art. 38 pkt 13 ustawy o prawach konsumenta). Szczegóły znajdziesz w Regulaminie Sklepu.",
      },
    ],
  },
  {
    id: "kiedy-zwrot",
    title: "Kiedy możliwy jest zwrot lub anulowanie?",
    content: [
      {
        type: "subheading",
        text: "Sytuacja 1: Plik nie został jeszcze pobrany",
      },
      {
        type: "paragraph",
        text: "Jeśli zapłaciłaś/zapłaciłeś za zamówienie, ale nie pobrałaś/pobrałeś jeszcze pliku (dostęp nie został przez Ciebie wykorzystany), masz prawo odstąpić od umowy w ciągu 14 dni od zakupu. W takim przypadku:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Napisz e-mail na adres kontakt@digibysabriel.pl z tytułem Odstąpienie od umowy",
          "Podaj numer zamówienia i adres e-mail użyty przy zakupie.",
          "Potwierdź, że nie pobrałaś/pobrałeś pliku.",
          "Zwrot środków nastąpi w ciągu 14 dni, tą samą metodą płatności, której użyłaś/użyłeś.",
        ],
      },
      {
        type: "subheading",
        text: "Sytuacja 2: Plik został pobrany — prawo odstąpienia wygasło",
      },
      {
        type: "paragraph",
        text: "Po pobraniu pliku, zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta, prawo do odstąpienia od umowy nie przysługuje. Wyjątek stanowią sytuacje opisane w sekcji Reklamacje poniżej.",
      },
    ],
  },
  {
    id: "reklamacje",
    title: "Reklamacje — niezgodność produktu z umową",
    content: [
      {
        type: "paragraph",
        text: "Masz prawo złożyć reklamację, jeśli pobrany plik jest niezgodny z umową. Reklamacja jest zasadna, gdy:",
      },
      {
        type: "list",
        items: [
          "Plik jest uszkodzony lub nie otwiera się prawidłowo (np. PDF wyświetla błąd).",
          "Pobrany plik zawiera inną grafikę niż przedstawiona w opisie produktu.",
          "Produkt nie posiada właściwości wyraźnie opisanych lub obiecanych w Sklepie.",
          "Plik jest niekompletny (brakuje elementów wskazanych w opisie).",
          "Link do pobrania wygasł przedwcześnie z przyczyn po stronie Sprzedawcy.",
        ],
      },
      {
        type: "highlight",
        text: "Reklamacja nie przysługuje z powodu niezadowolenia z wyglądu grafiki, która jest zgodna ze zdjęciami i opisem w Sklepie, ani z powodu niezgodności z oprogramowaniem, które nie obsługuje dostarczonego formatu.",
      },
    ],
  },
  {
    id: "procedura-reklamacyjna",
    title: "Jak złożyć reklamację?",
    content: [
      {
        type: "paragraph",
        text: "Reklamację możesz złożyć wyłącznie drogą e-mailową:",
      },
      { type: "contact", label: "E-mail", value: "kontakt@digibysabriel.pl", href: "mailto:kontakt@digibysabriel.pl" },
      {
        type: "paragraph",
        text: "W treści wiadomości prosimy o podanie:",
      },
      {
        type: "list",
        items: [
          "Imię i nazwisko lub login konta.",
          "Numer zamówienia (znajdziesz go w e-mailu potwierdzającym lub w sekcji Moje zamówienia).",
          "Nazwa reklamowanego produktu.",
          "Opis stwierdzonej wady lub niezgodności z umową.",
          "Zrzut ekranu lub inny materiał dokumentujący problem (jeśli to możliwe).",
          "Preferowany sposób rozwiązania reklamacji: wymiana pliku na poprawny lub zwrot środków.",
        ],
      },
      {
        type: "subheading",
        text: "Termin rozpatrzenia",
      },
      {
        type: "paragraph",
        text: "Reklamację rozpatruję w ciągu 14 dni kalendarzowych od daty jej otrzymania. O wyniku poinformuję e-mailem na adres podany w zgłoszeniu. Brak odpowiedzi w tym terminie oznacza uznanie reklamacji za zasadną.",
      },
    ],
  },
  {
    id: "sposob-naprawienia",
    title: "Sposoby rozwiązania reklamacji",
    content: [
      {
        type: "paragraph",
        text: "W przypadku uwzględnienia reklamacji zaproponuję jedno z poniższych rozwiązań:",
      },
      {
        type: "list",
        items: [
          "Wymiana na poprawny/kompletny plik — dostarczam nowy plik w najkrótszym możliwym czasie.",
          "Obniżenie ceny — jeśli wada jest nieistotna i jej usunięcie nie jest możliwe, zaproponuję stosowny rabat lub bon.",
          "Zwrot pełnej kwoty — jeśli wada jest istotna i nie ma możliwości dostarczenia poprawnego produktu, zwracam pełną kwotę w ciągu 14 dni tą samą metodą płatności.",
        ],
      },
      {
        type: "paragraph",
        text: "Wybór sposobu zależy od charakteru wady i Twoich preferencji wskazanych w zgłoszeniu reklamacyjnym.",
      },
    ],
  },
  {
    id: "pozasadowe",
    title: "Pozasądowe metody rozwiązywania sporów",
    content: [
      {
        type: "paragraph",
        text: "Jako Konsument masz prawo skorzystać z pozasądowych metod rozwiązywania sporów. Dostępne opcje:",
      },
      {
        type: "list",
        items: [
          "Mediacja przy Inspekcji Handlowej — bezpłatna, prowadzona przez Wojewódzkich Inspektorów Inspekcji Handlowej. Szczegóły na uokik.gov.pl.",
          "Sąd Polubowny przy Inspekcji Handlowej — możliwość złożenia wniosku o rozstrzygnięcie sporu.",
          "Platforma ODR (Online Dispute Resolution) — unijny system internetowego rozwiązywania sporów dostępny pod adresem ec.europa.eu/consumers/odr.",
        ],
      },
      {
        type: "paragraph",
        text: "Skorzystanie z powyższych metod jest dobrowolne i wymaga zgody obu stron. Sprzedawca deklaruje gotowość do udziału w postępowaniu mediacyjnym.",
      },
      { type: "contact", label: "Kontakt UOKiK", value: "uokik.gov.pl" },
      { type: "contact", label: "Platforma ODR", value: "ec.europa.eu/consumers/odr" },
    ],
  },
  {
    id: "kontakt",
    title: "Kontakt w sprawach zwrotów i reklamacji",
    content: [
      {
        type: "paragraph",
        text: "W razie pytań lub wątpliwości dotyczących zwrotów i reklamacji jestem do dyspozycji. Odpowiadam na wiadomości w ciągu 24 godzin w dni robocze.",
      },
      { type: "contact", label: "E-mail", value: "kontakt@digibysabriel.pl", href: "mailto:kontakt@digibysabriel.pl" },
      { type: "contact", label: "Czas odpowiedzi", value: "do 24 h w dni robocze" },
    ],
  },
];

export default function ZwrotyReklamacje() {
  return (
    <LegalPage
      label="Informacje prawne"
      title="Zwroty i Reklamacje"
      subtitle="Wszystko, co musisz wiedzieć o procesie zwrotów i zgłaszania reklamacji w naszym sklepie."
      effectiveDate="7 czerwca 2026 r."
      sections={SECTIONS}
    />
  );
}
