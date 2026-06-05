import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/woocommerce/products";
import { sanitize } from "@/lib/utils/sanitize";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const result = await getProducts({ first: 100 });
  if (!result.data) return [];
  return result.data.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProductBySlug(slug);
  if (!result.data) return {};
  return {
    title: `${result.data.name} — Digi by Sabriel`,
    description: result.data.shortDescription || result.data.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const result = await getProductBySlug(slug);

  if (!result.data) {
    notFound();
  }

  const product = result.data;
  const category = product.productCategories.nodes[0];

  return (
    <main className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
          {product.image ? (
            <img
              src={product.image.sourceUrl}
              alt={product.image.altText || product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              Brak zdjęcia
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {category && (
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {category.name}
            </span>
          )}
          <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="text-2xl font-bold text-slate-800">{product.price}</p>

          {product.shortDescription && (
            <div
              className="text-slate-600 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitize(product.shortDescription) }}
            />
          )}

          <button
            className="mt-4 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm shadow-primary/20"
            aria-label={`Dodaj ${product.name} do koszyka`}
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>

      {product.description && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Opis produktu</h2>
          <div
            className="prose prose-slate max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: sanitize(product.description) }}
          />
        </div>
      )}
    </main>
  );
}
