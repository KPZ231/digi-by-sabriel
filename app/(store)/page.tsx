import Hero from "@/components/ui/Hero";
import Categories from "@/components/ui/Categories";
import WhyUs from "@/components/ui/WhyUs";
import Bestsellers from "@/components/ui/Bestsellers";
import { getFeaturedProducts, getCategories } from "@/lib/woocommerce/products";
import Testimonials from './../../components/ui/Testimonials';
import NewsletterCTA from "@/components/ui/NewsletterCTA";


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
      <Testimonials></Testimonials>
      <NewsletterCTA></NewsletterCTA>
    </>
  );
}
