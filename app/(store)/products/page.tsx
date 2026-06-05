import type { Metadata } from "next";
import ProductsHero from "@/components/products/ProductsHero";
import ProductsView from "@/components/products/ProductsView";
import { getProducts, getCategories } from "@/lib/woocommerce/products";

export const metadata: Metadata = {
  title: "Wszystkie grafiki — Digi by Sabriel",
  description:
    "Ponad 300 unikalnych grafik cyfrowych do scrapbookingu. Urodziny, ślub, Baby Shower i więcej. Pobierz natychmiast po zakupie.",
};

export default async function ProductsPage() {
  const [productsResult, categoriesResult] = await Promise.all([
    getProducts({ first: 100 }),
    getCategories(),
  ]);

  const products = productsResult.data ?? [];
  const categories = categoriesResult.data ?? [];

  return (
    <main>
      <ProductsHero categories={categories} />
      <ProductsView products={products} categories={categories} />
    </main>
  );
}
