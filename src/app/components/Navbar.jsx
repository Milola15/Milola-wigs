'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePanier } from './PanierContext';

const tendances = [
  { label: 'Lisse', value: 'lace' },
  { label: 'Perruques naturelles', value: 'naturel' },
  { label: 'Bob court', value: 'bob' },
  { label: 'Ondulé', value: 'ondule' }
];

export default function Navbar() {
  const { totalArticles } = usePanier();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effet au scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-xl' : 'shadow-none'
    }`}>

      {/* NIVEAU 1 — principal */}
      <div className="bg-brun-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl text-brun-100 tracking-wide">
              Milola
            </span>
            <span className="bg-brun-600 text-brun-50 text-xs px-2 py-0.5 rounded-full tracking-widest">
              WIGS
            </span>
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
           {[
           { label: 'Accueil', href: '/' },
           { label: 'Catalogue', href: '/#catalogue' },
           { label: 'Collections', href: '/collections' },
             { label: 'Contact', href: '/contact' },
            ].map((lien) => ( 
              
               <a key={lien.label}
                href={lien.href}
                className="text-brun-200 hover:text-brun-50 transition-colors duration-200 relative group"
              >
                {lien.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brun-200 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Icônes droite */}
          <div className="flex items-center gap-4">
            
            
            {/* Panier */}
            <Link
              href="/panier"
              className="relative text-brun-200 hover:text-brun-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .955-.343 1.087-.835l1.52-5.699A1.125 1.125 0 0018.116 8.25H7.116L5.25 4.272" />
              </svg>
              {totalArticles > 0 && (
                <span className="absolute -top-2 -right-2 bg-brun-200 text-brun-900 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {totalArticles}
                </span>
              )}
            </Link>

            {/* Avatar utilisateur */}
            <div className="hidden md:flex w-8 h-8 rounded-full bg-brun-600 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-brun-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMenuOuvert(!menuOuvert)}
              className="md:hidden text-brun-200 hover:text-brun-50 transition-colors"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-brun-200 rounded transition-all duration-300 ${menuOuvert ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`} />
                <span className={`block h-0.5 bg-brun-200 rounded transition-all duration-300 ${menuOuvert ? 'opacity-0 w-0' : 'w-3.5'}`} />
                <span className={`block h-0.5 bg-brun-200 rounded transition-all duration-300 ${menuOuvert ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

{/* NIVEAU 2 — tendances (desktop seulement) */}
<div className="hidden md:block bg-brun-700 px-6 py-2">
  <div className="max-w-6xl mx-auto flex items-center gap-4 overflow-x-auto scrollbar-hide">
    <span className="text-xs text-brun-400 tracking-widest whitespace-nowrap">
      TENDANCES :
    </span>
    <div className="flex gap-2">
      {tendances.map((tag) => (
        <Link
          key={tag.label}
          href={`/collections?cat=${tag.value}`}
          className="text-xs text-brun-200 bg-brun-900 hover:bg-brun-600 hover:text-brun-50 px-3 py-1 rounded-full whitespace-nowrap transition-all duration-200"
        >
          {tag.label}
        </Link>
      ))}
    </div>
  </div>
</div>

      {/* Menu mobile déroulant */}
      <div className={`md:hidden bg-brun-900 border-t border-brun-700 overflow-hidden transition-all duration-300 ${
        menuOuvert ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="flex flex-col px-6 py-4 gap-5">
         {[
  { label: 'Accueil', href: '/' },
  { label: 'Catalogue', href: '/#catalogue' },
  { label: 'Collections', href: '/collections' },
  { label: 'Contact', href: '/contact' },
].map((lien) => (
            
             <a key={lien.label}
              href={lien.href}
              onClick={() => setMenuOuvert(false)}
              className="text-brun-200 hover:text-brun-50 text-sm transition-colors"
            >
              {lien.label}
            </a>
          ))}
          <div className="flex gap-2 flex-wrap pt-2 border-t border-brun-700">
  {tendances.slice(0, 4).map((tag) => (
    <Link
      key={tag.label}
      href={`/collections?cat=${tag.value}`}
      className="text-xs text-brun-200 bg-brun-700 px-3 py-1 rounded-full"
    >
      {tag.label}
    </Link>
  ))}
</div>
        </nav>
      </div>
    </header>
  );
}