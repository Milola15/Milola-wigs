import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BoutonPanier from '@/app/components/BoutonPanier';
import Navbar from '@/app/components/Navbar';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) notFound();

  // Fonction pour garantir que l'image pointe vers la racine du dossier public
  const formatImagePath = (url) => {
    if (!url) return 'https://placehold.co/400x400?text=Produit';
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `/${url}`;
  };

  return (
    <main className="bg-brun-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link href="/" className="inline-flex items-center text-sm text-brun-400 hover:text-brun-700 mb-8 transition-colors">
          ← Retour au catalogue
        </Link>

        <div className="bg-white rounded-2xl border border-brun-100 overflow-hidden shadow-sm">
          <div className="grid grid-cols-2">
            
            {/* Image */}
            <div className="bg-brun-200 h-80 md:h-[600px] overflow-hidden">
              <img
                src={formatImagePath(product.imageUrl)}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Infos */}
            <div className="p-3 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs tracking-wide text-brun-400 mb-1">
                  Référence #{product.id}
                </p>
                <h1 className="font-display text-base md:text-2xl text-brun-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-brun-400 text-xs md:text-sm leading-relaxed mb-3 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-display text-lg md:text-3xl text-brun-600">
                    {product.price.toLocaleString('fr-FR')} FCFA
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    product.stock > 0
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                  </span>
                </div>
              </div>
              <BoutonPanier product={product} />
            </div>

          </div>
        </div>
      </div>

      <footer className="border-t border-brun-100 py-4 text-center text-xs text-brun-400 mt-10">
        © 2026 Mini-boutique
      </footer>
    </main>
  );
}