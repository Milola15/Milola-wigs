import { PrismaClient } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  // Supprime les produits existants pour éviter les doublons
  await prisma.product.deleteMany();

  const products = [
    {
      name: 'Perruque lisse avec lace frontale',
      description: 'Qualité humain longueur 32, Couleur ginger',
      price: 65000,
      imageUrl: 'TON_URL_UPLOADTHING',
      stock: 5,
      categorie: 'lace',
    },
    // Ajoute tous tes produits ici
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ ${products.length} produits créés.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());