import { notFound } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import { getProducts, getCategories } from "@/lib/woocommerce/products";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const result = await getCategories();
  if (!result.data) return [];
  return result.data.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCategories();
  const category = result.data?.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} — Digi by Sabriel`,
    description: `Przeglądaj produkty w kategorii ${category.name}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [productsResult, categoriesResult] = await Promise.all([
    getProducts({ category: slug, first: 50 }),
    getCategories(),
  ]);

  const category = categoriesResult.data?.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = productsResult.data ?? [];

  return (
    <main className="w-full px-4 md:px-8 py-12 md:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10">
        {category.name}
      </h1>
      <ProductGrid products={products} />
    </main>
  );
}
