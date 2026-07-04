'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';

const categories = [
  { label: 'Tout', value: 'tout' },
  { label: 'Bob court', value: 'bob' },
  { label: 'Ondulé', value: 'ondule' },
  { label: 'Lisse', value: 'lace' },
  { label: 'Naturel', value: 'naturel' }
];

export default function CollectionsClient({ products, categorieInitiale = 'tout' }) {
  const [categorie, setCategorie] = useState(categorieInitiale);

  // Filtre simple basé sur le champ categorie de la BDD
  const produitsFiltres = categorie === 'tout'
    ? products
    : products.filter((p) => p.categorie === categorie);

  return (
    <main className="bg-brun-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-xs tracking-widest text-brun-400 uppercase mb-1">
          Milola Wigs
        </p>
        <h1 className="font-display text-3xl text-brun-900 mb-8">
          Collections
        </h1>

        {/* FILTRES */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategorie(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                categorie === cat.value
                  ? 'bg-brun-900 text-brun-50 shadow-md scale-105'
                  : 'bg-white border border-brun-100 text-brun-600 hover:border-brun-400 hover:text-brun-900'
              }`}
            >
              {cat.label}
              {cat.value !== 'tout' && (
                <span className="ml-2 text-xs opacity-60">
                  ({products.filter(p => p.categorie === cat.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* RÉSULTATS */}
        {produitsFiltres.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-brun-100">
            <p className="text-4xl mb-4">🔍</p>
            <h2 className="font-display text-xl text-brun-900 mb-2">
              Aucun produit dans cette catégorie
            </h2>
            <p className="text-brun-400 text-sm mb-6">
              Essaie un autre filtre ou consulte tout le catalogue.
            </p>
            <button
              onClick={() => setCategorie('tout')}
              className="bg-brun-900 text-brun-50 text-sm px-6 py-3 rounded-lg hover:bg-brun-700 transition-colors"
            >
              Voir tout
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-brun-400 mb-6">
              {produitsFiltres.length} produit{produitsFiltres.length > 1 ? 's' : ''} trouvé{produitsFiltres.length > 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {produitsFiltres.map((product) => (
                <Link
                  key={product.id}
                  href={`/produits/${product.id}`}
                  className="block bg-white rounded-xl border border-brun-100 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-full h-56 overflow-hidden bg-brun-200">
                    <img
                      src={product.imageUrl || 'https://placehold.co/400x400?text=Produit'}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs bg-brun-100 text-brun-600 px-2 py-0.5 rounded-full">
                      {categories.find(c => c.value === product.categorie)?.label || 'Autre'}
                    </span>
                    <h3 className="font-medium text-brun-900 leading-tight mt-2">
                      {product.name}
                    </h3>
                    <p className="text-brun-400 text-xs mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-brun-600 font-semibold">
                        {product.price.toLocaleString('fr-FR')} FCFA
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        product.stock > 0
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-600'
                      }`}>
                        {product.stock > 0 ? 'En stock' : 'Rupture'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="border-t border-brun-100 py-6 text-center text-xs bg-brun-900 text-brun-200 mt-10">
        © 2026 Milola Wigs — Tous droits réservés
      </footer>
    </main>
  );
}