import ProductGrid from "@/components/product/ProductGrid";
import { getProducts } from "@/lib/woocommerce/products";

export const metadata = {
  title: "Wszystkie produkty — Digi by Sabriel",
  description: "Przeglądaj nasze cyfrowe grafiki scrapbookingowe.",
};

export default async function ProductsPage() {
  const result = await getProducts({ first: 50 });
  const products = result.data ?? [];

  return (
    <main className="w-full px-4 md:px-8 py-12 md:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10">
        Wszystkie produkty
      </h1>
      <ProductGrid products={products} />
    </main>
  );
}
