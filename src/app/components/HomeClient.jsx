'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';

// Les slides du carrousel — modifie les images selon tes fichiers dans public/images/
const slides = [
  {
    image: '/images/ond1.jpg',
    tag: 'NOUVELLE COLLECTION 2026',
    titre: 'Révèle ta',
    accent: 'beauté naturelle',
    sous: 'Des perruques haut de gamme pour chaque style et chaque occasion.',
  },
  {
    image: '/images/lis2.jpg',
    tag: 'LACE FRONT PREMIUM',
    titre: 'Le naturel',
    accent: 'réinventé',
    sous: 'Des finitions invisibles pour un rendu 100% authentique.',
  },
  {
    image: '/images/ond5.jpg',
    tag: 'BOB & LISSE',
    titre: 'Élégance',
    accent: 'au quotidien',
    sous: 'Des coupes modernes qui subliment chaque visage.',
  },
];

// Les catégories cliquables
const categories = [
  {
    label: 'Lace Front',
    href: '/collections?cat=lace',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    label: 'Ondulé',
    href: '/collections?cat=ondule',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    label: 'Bob court',
    href: '/collections?cat=bob',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
      </svg>
    ),
  },
  {
    label: 'Naturel',
    href: '/collections?cat=naturel',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
];

// Les éléments de confiance
const confiance = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    texte: 'Livraison rapide',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    texte: 'Qualité garantie',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    texte: 'Retour 30 jours',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    texte: '+500 clientes satisfaites',
  },
];

export default function HomeClient({ products }) {
  const [current, setCurrent] = useState(0);       // slide actif du carrousel
  const [visible, setVisible] = useState([]);       // IDs des cartes produits visibles
  const [heroVisible, setHeroVisible] = useState(false); // animation d'entrée du hero

  //  Carrousel automatique — change de slide toutes les 4 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer); // nettoyage quand le composant est détruit
  }, []);

  //  Animation d'entrée du hero — déclenché 100ms après le chargement
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Intersection Observer — observe chaque carte produit
  // Quand une carte entre dans le viewport, on l'ajoute à "visible"
  // ça déclenche l'animation fade-in + slide-up via les classes CSS
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => [...prev, entry.target.dataset.id]);
          }
        });
      },
      { threshold: 0.15 } // déclenche quand 15% de la carte est visible
    );
    document.querySelectorAll('[data-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  return (
    <main className="bg-brun-50 min-h-screen">

      {/* ============================================
          SECTION 1 — CARROUSEL HERO
          Image plein écran + texte animé à gauche
          ============================================ */}
          <Navbar />
      <section id="accueil" className="relative h-[80vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image de fond */}
            <img
              src={slide.image}
              alt={slide.titre}
              className="w-full h-full object-cover"
            />
            {/* Overlay dégradé — brun foncé à gauche, transparent à droite */}
            <div className="absolute inset-0 bg-gradient-to-r from-brun-900/85 via-brun-900/40 to-transparent" />

            {/* Texte du slide — animé quand c'est le slide actif */}
            <div className={`absolute bottom-20 left-10 max-w-md transition-all duration-700 ${
              index === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <span className="text-xs tracking-widest text-brun-200 mb-3 block">
                {slide.tag}
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-brun-50 leading-tight mb-3">
                {slide.titre}<br />
                <span className="text-brun-200">{slide.accent}</span>
              </h1>
              <p className="text-brun-300 font-semibold   text-sm mb-6 leading-relaxed">
                {slide.sous}
              </p>
              <div className="flex gap-3 flex-wrap">
                
                <a  href="/#catalogue"
                  className="bg-brun-200 text-brun-900 text-sm font-medium px-6 py-3 rounded-lg hover:bg-brun-50 transition-colors duration-200"
                >
                  Voir la collection
                </a>
                
                <a  href="#categories"
                  className="border-2 border-brun-400 font-semibold text-brun-200 text-sm px-6 py-3 rounded-lg hover:border-brun-200 hover:text-brun-50 transition-colors duration-200"
                >
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Points de navigation du carrousel */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-brun-200 w-8'   // actif → barre large
                  : 'bg-brun-600 w-2'   // inactif → petit point
              }`}
            />
          ))}
        </div>
      </section>

      {/* ============================================
          SECTION 2 — BANDEAU DE CONFIANCE

          ============================================ */}
      <section className="bg-brun-900 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {confiance.map((item, i) => (
  <div key={i} className="flex items-center gap-3 py-2">
    <div className="text-brun-200">
      {item.icon}
    </div>
    <span className="text-brun-200 text-sm">{item.texte}</span>
  </div>
))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3 — CATÉGORIES
          4 cards cliquables pour naviguer par style
          Animation : apparition depuis le bas au scroll
          ============================================ */}
      <section id="categories" className="py-14 max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-widest text-brun-400 mb-1 uppercase">
          Shop by style
        </p>
        <h2 className="font-display text-2xl text-brun-900 mb-8">
          Nos catégories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {categories.map((cat, i) => (
  
   <a key={cat.label}
    href={cat.href}
    style={{ transitionDelay: `${i * 100}ms` }}
    className="group bg-brun-900 rounded-xl p-6 text-center hover:bg-brun-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="text-brun-200 flex justify-center mb-3 group-hover:text-brun-50 transition-colors">
      {cat.icon}
    </div>
    <span className="text-brun-200 text-sm group-hover:text-brun-50 transition-colors">
      {cat.label}
    </span>
  </a>
))}
        </div>
      </section>

     <section id="catalogue" className="py-14 max-w-6xl mx-auto px-6">
  <p className="text-xs tracking-widest text-brun-400 mb-1 uppercase">
    Notre sélection
  </p>
  <h2 className="font-display text-2xl text-brun-900 mb-8">
    Catalogue
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
    {products.map((product, i) => (
      <Link
        key={product.id}
        href={`/produits/${product.id}`}
        data-id={product.id}
        style={{
          transitionDelay: `${i * 80}ms`,
          transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease',
        }}
        className={`block bg-white rounded-xl border border-brun-100 overflow-hidden
          hover:-translate-y-2 hover:shadow-xl
          ${visible.includes(String(product.id))
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
          }`}
      >
        <div className="w-full h-64 md:h-56 overflow-hidden bg-brun-200">
          <img
            src={product.imageUrl || 'https://placehold.co/400x400?text=Produit'}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-brun-900 leading-tight line-clamp-1">
            {product.name}
          </h3>
          <p className="text-brun-400 text-xs mt-1 line-clamp-2 hidden md:block">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <p className="text-brun-600 font-semibold text-sm">
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
</section>

      {/* Footer */}
      <footer className="border-t border-brun-100 py-6 text-center text-xs text-brun-400 bg-brun-900 text-brun-200 mt-10">
        © 2026 Milola Wigs — Tous droits réservés
      </footer>

    </main>
  );
}