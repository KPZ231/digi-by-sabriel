import Hero from "@/components/ui/Hero";
import Categories from "@/components/ui/Categories";
import WhyUs from "@/components/ui/WhyUs";
import Bestsellers from "@/components/ui/Bestsellers";
import { getFeaturedProducts, getCategories } from "@/lib/woocommerce/products";

export default async function Home() {
  const [productsResult, categoriesResult] = await Promise.all([
    getFeaturedProducts(4),
    getCategories(),
  ]);

  const products = productsResult.data ?? [];
  const categories = categoriesResult.data ?? [];

  return (
    <>
      <Hero />
      <Categories categories={categories} />
      <WhyUs />
      <Bestsellers products={products} />
    </>
  );
}
