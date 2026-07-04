'use client';

import { usePanier } from '@/app/components/PanierContext';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

export default function PanierPage() {
  const { panier, retirerDuPanier, viderPanier, totalPrix } = usePanier();

  return (
    <main className="bg-brun-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest text-brun-400 uppercase mb-1">
              Votre sélection
            </p>
            <h1 className="font-display text-2xl text-brun-900">
              Mon panier
            </h1>
          </div>
          {panier.length > 0 && (
            <button
              onClick={viderPanier}
              className="text-sm text-brun-400 hover:text-red-500 transition-colors"
            >
              Vider le panier
            </button>
          )}
        </div>

        {/* Panier vide */}
        {panier.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-brun-100">
            <p className="text-4xl mb-4">🛒</p>
            <h2 className="font-display text-xl text-brun-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-brun-400 text-sm mb-6">
              Découvrez notre collection et ajoutez des articles.
            </p>
            <Link
              href="/#catalogue"
              className="inline-flex items-center bg-brun-900 text-brun-50 text-sm font-medium px-6 py-3 rounded-lg hover:bg-brun-700 transition-colors"
            >
              Voir le catalogue
            </Link>
          </div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Liste des articles — prend 2/3 de la largeur */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {panier.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-brun-100 p-4 flex gap-4 items-center"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-brun-200 flex-shrink-0">
                    <img
                      src={item.imageUrl || 'https://placehold.co/80x80?text=Produit'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-brun-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-brun-400 text-xs mt-0.5">
                      {item.price.toLocaleString('fr-FR')} FCFA / unité
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-brun-400">Qté :</span>
                      <span className="bg-brun-100 text-brun-900 text-xs font-medium px-2 py-0.5 rounded">
                        {item.quantite}
                      </span>
                    </div>
                  </div>

                  {/* Prix total ligne + bouton supprimer */}
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-semibold text-brun-600">
                      {(item.price * item.quantite).toLocaleString('fr-FR')} FCFA
                    </p>
                    <button
                      onClick={() => retirerDuPanier(item.id)}
                      className="text-xs text-brun-400 hover:text-red-500 transition-colors"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Récapitulatif commande — prend 1/3 de la largeur */}
            <div className="md:col-span-1">
              <div className="bg-brun-900 rounded-xl p-6 sticky top-24">
                <h2 className="font-display text-lg text-brun-50 mb-4">
                  Récapitulatif
                </h2>

                {/* Détail par article */}
                <div className="flex flex-col gap-2 mb-4 border-b border-brun-700 pb-4">
                  {panier.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-brun-400 truncate max-w-[140px]">
                        {item.name} × {item.quantite}
                      </span>
                      <span className="text-brun-200">
                        {(item.price * item.quantite).toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-brun-200 text-sm">Total</span>
                  <span className="font-display text-xl text-brun-50">
                    {totalPrix.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>

                {/* Bouton commander */}
                {/* Bouton commander via WhatsApp */}
<button
  onClick={() => {
    const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const lignes = panier.map(item =>
      `🛍️ *${item.name}* × ${item.quantite} — ${(item.price * item.quantite).toLocaleString('fr-FR')} FCFA`
    ).join('\n');

    const message = [
      `Bonjour Milola Wigs ! 👋`,
      ``,
      `Je souhaite commander les articles suivants :`,
      ``,
      lignes,
      ``,
      `💰 *Total : ${totalPrix.toLocaleString('fr-FR')} FCFA *`,
      ``,
      `Merci de confirmer ma commande !`,
    ].join('\n');

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }}
  className="w-full bg-green-500 text-white font-medium text-sm py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
>
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
  Commander via WhatsApp
</button>

                {/* Lien retour */}
                <Link
                  href="/#catalogue"
                  className="block text-center text-xs text-brun-400 hover:text-brun-200 mt-4 transition-colors"
                >
                  ← Continuer mes achats
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>

      <footer className="border-t border-brun-100 py-6 text-center text-xs bg-brun-900 text-brun-200 mt-10">
        © 2026 Milola Wigs — Tous droits réservés
      </footer>
    </main>
  );
}