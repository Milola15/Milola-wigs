const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: 'Casque Audio Sans Fil',
      description: 'Casque bluetooth avec réduction de bruit active, autonomie 30h.',
      price: 89.99,
      imageUrl: 'https://placehold.co/400x400?text=Casque',
      stock: 15,
    },
    {
      name: 'Montre Connectée',
      description: 'Suivi d\'activité, notifications, étanche, écran AMOLED.',
      price: 129.99,
      imageUrl: 'https://placehold.co/400x400?text=Montre',
      stock: 8,
    },
    {
      name: 'Clavier Mécanique RGB',
      description: 'Switches mécaniques, rétroéclairage RGB personnalisable.',
      price: 64.99,
      imageUrl: 'https://placehold.co/400x400?text=Clavier',
      stock: 20,
    },
    {
      name: 'Sac à Dos Ordinateur',
      description: 'Compartiment rembourré 15.6", résistant à l\'eau.',
      price: 39.99,
      imageUrl: 'https://placehold.co/400x400?text=Sac',
      stock: 25,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ ${products.length} produits créés.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });