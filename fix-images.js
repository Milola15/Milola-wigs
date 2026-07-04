import prisma from './src/lib/prisma.js';

async function main() {
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    if (product.imageUrl && !product.imageUrl.startsWith('/')) {
      await prisma.product.update({
        where: { id: product.id },
        data: { imageUrl: '/' + product.imageUrl },
      });
      console.log(`Corrigé : ${product.name} -> /${product.imageUrl}`);
    }
  }
  console.log('Terminé !');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());