import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Polityka Cookies — Digi by Sabriel",
  description: "Polityka plików cookies sklepu Digi by Sabriel. Informacje o używanych ciasteczkach i sposobach zarządzania nimi.",
  robots: { index: true, follow: true },
};

const SECTIONS: LegalSection[] = [
  {
    id: "czym-sa-cookies",
    title: "Czym są pliki cookies?",
    content: [
      {
        type: "paragraph",
        text: "Pliki cookies (ciasteczka) to małe pliki tekstowe zapisywane przez przeglądarkę internetową na Twoim urządzeniu podczas odwiedzania stron internetowych. Pozwalają one stronie zapamiętać Twoje preferencje i działania, dzięki czemu kolejna wizyta jest wygodniejsza.",
      },
      {
        type: "paragraph",
        text: "Niniejsza Polityka Cookies dotyczy serwisu digibysabriel.pl i ma zastosowanie zgodnie z ustawą z dnia 16 lipca 2004 r. Prawo telekomunikacyjne (Dz.U. z 2022 r. poz. 1648) oraz rozporządzeniem RODO.",
      },
    ],
  },
  {
    id: "rodzaje-cookies",
    title: "Jakie cookies stosujemy?",
    content: [
      {
        type: "subheading",
        text: "1. Cookies niezbędne (zawsze aktywne)",
      },
      {
        type: "paragraph",
        text: "Są absolutnie konieczne do prawidłowego działania sklepu. Bez nich nie możesz logować się na konto ani korzystać z koszyka. Nie wymagają Twojej zgody, ponieważ ich stosowanie opiera się na prawnie uzasadnionym interesie lub wykonaniu umowy.",
      },
      {
        type: "list",
        items: [
          "Sesja użytkownika (utrzymanie stanu zalogowania)",
          "Token bezpieczeństwa (ochrona formularzy przed atakami CSRF)",
          "Zawartość koszyka zakupowego",
          "Zapamiętanie Twoich preferencji dotyczących cookies",
        ],
      },
      {
        type: "subheading",
        text: "2. Cookies analityczne (wymagają zgody)",
      },
      {
        type: "paragraph",
        text: "Pomagają mi zrozumieć, w jaki sposób odwiedzający korzystają z serwisu — które podstrony są najpopularniejsze, jak długo trwa wizyta. Informacje są anonimowe i służą wyłącznie do poprawy jakości sklepu.",
      },
      {
        type: "list",
        items: [
          "Google Analytics / Google Tag Manager — anonimowe statystyki odwiedzin (z włączoną anonimizacją IP).",
        ],
      },
      {
        type: "subheading",
        text: "3. Cookies funkcjonalne (wymagają zgody)",
      },
      {
        type: "paragraph",
        text: "Umożliwiają zapamiętanie Twoich preferencji, takich jak język strony lub ustawienia wyświetlania.",
      },
      {
        type: "list",
        items: [
          "Zapamiętanie wybranego języka interfejsu",
          "Preferencje wyświetlania produktów (siatka/lista)",
        ],
      },
    ],
  },
  {
    id: "czas-waznosci",
    title: "Czas ważności cookies",
    content: [
      {
        type: "paragraph",
        text: "Cookies dzielą się na sesyjne i trwałe:",
      },
      {
        type: "list",
        items: [
          "Sesyjne — istnieją wyłącznie podczas trwania sesji przeglądarki. Są usuwane automatycznie po jej zamknięciu.",
          "Trwałe — pozostają na urządzeniu przez określony czas (np. 12 lub 24 miesiące) albo do momentu ręcznego usunięcia.",
        ],
      },
      {
        type: "highlight",
        text: "Cookies niezbędne i sesyjne nie wymagają Twojej zgody. Na cookies analityczne i funkcjonalne pytam o zgodę przy pierwszej wizycie przez baner cookies.",
      },
    ],
  },
  {
    id: "zarzadzanie",
    title: "Jak zarządzać cookies i wycofać zgodę?",
    content: [
      {
        type: "paragraph",
        text: "Możesz w każdej chwili zmienić swoje ustawienia dotyczące cookies na kilka sposobów:",
      },
      {
        type: "subheading",
        text: "Przez ustawienia przeglądarki",
      },
      {
        type: "list",
        items: [
          "Chrome: Ustawienia > Prywatność i bezpieczeństwo > Pliki cookie i inne dane witryn",
          "Firefox: Ustawienia > Prywatność i bezpieczeństwo > Pliki cookie i dane stron",
          "Safari: Preferencje > Prywatność > Zarządzaj danymi witryn",
          "Edge: Ustawienia > Pliki cookie i uprawnienia witryn",
        ],
      },
      {
        type: "paragraph",
        text: "Zablokowanie lub usunięcie cookies niezbędnych może uniemożliwić korzystanie z koszyka i logowanie się do konta.",
      },
      {
        type: "subheading",
        text: "Przez baner cookies na stronie",
      },
      {
        type: "paragraph",
        text: "Przy pierwszej wizycie wyświetla się baner, w którym możesz wybrać, na które cookies wyrażasz zgodę. Ustawienia możesz zmienić ponownie klikając link Ustawienia cookies w stopce strony.",
      },
    ],
  },
  {
    id: "podmioty-zewnetrzne",
    title: "Cookies podmiotów zewnętrznych",
    content: [
      {
        type: "paragraph",
        text: "Serwis może korzystać z usług podmiotów zewnętrznych, które mogą umieszczać własne pliki cookies na Twoim urządzeniu. Są to:",
      },
      {
        type: "list",
        items: [
          "Google LLC (Google Analytics, Google Tag Manager) — polityka prywatności dostępna na policies.google.com/privacy.",
          "Operator systemu płatności (Stripe Inc. lub inny) — szczegóły w regulaminie wybranego operatora.",
        ],
      },
      {
        type: "paragraph",
        text: "Nie mam kontroli nad cookies umieszczanymi przez te podmioty. Zachęcam do zapoznania się z ich politykami prywatności.",
      },
    ],
  },
  {
    id: "zmiany-polityki",
    title: "Zmiany Polityki Cookies",
    content: [
      {
        type: "paragraph",
        text: "Zastrzegam prawo do zmiany niniejszej Polityki Cookies w związku ze zmianami technologicznymi lub prawnymi. Aktualna wersja jest zawsze dostępna pod adresem digibysabriel.pl/polityka-cookies.",
      },
    ],
  },
];

export default function PolitykaCookies() {
  return (
    <LegalPage
      label="Informacje prawne"
      title="Polityka Cookies"
      subtitle="Informacje o plikach cookies używanych na tej stronie oraz o tym, jak możesz nimi zarządzać."
      effectiveDate="7 czerwca 2026 r."
      sections={SECTIONS}
    />
  );
}
