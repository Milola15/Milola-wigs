'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const PanierContext = createContext(null);

export function PanierProvider({ children }) {
  const [panier, setPanier] = useState([]);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('panier');
    if (saved) setPanier(JSON.parse(saved));
  }, []);

  // Sauvegarder à chaque changement
  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(panier));
  }, [panier]);

  const ajouterAuPanier = (product) => {
    setPanier((prev) => {
      const existe = prev.find((item) => item.id === product.id);
      if (existe) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantite: 1 }];
    });
  };

  const retirerDuPanier = (id) => {
    setPanier((prev) => prev.filter((item) => item.id !== id));
  };

  const viderPanier = () => setPanier([]);

  const totalArticles = panier.reduce((acc, item) => acc + item.quantite, 0);
  const totalPrix = panier.reduce((acc, item) => acc + item.price * item.quantite, 0);

  return (
    <PanierContext.Provider value={{
      panier,
      ajouterAuPanier,
      retirerDuPanier,
      viderPanier,
      totalArticles,
      totalPrix,
    }}>
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  return useContext(PanierContext);
}