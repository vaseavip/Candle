// js/array.js
// Lista completă de produse cu toate detaliile

const products = [
  {
    id: 1,
    name: 'Candle Statue',
    price: 6,
    categoryId: 3,
    description: "Handmade candle with 'Statue' design.",
    sizes: ['Small', 'Medium', 'Large'],
    characteristics: {
      material: 'Natural wax (soy / beeswax)',
      fuseType: '100% smoke-free cotton',
      weight: '150 g',
      height: '8 cm',
      burningTime: '25–30 hours',
      flavor: ['Vanilla', 'Lavender', 'Floral'],
      color: 'Natural white',
      achievement: 'Handmade, hand-casting',
    },
    stock: 50,
  },
  {
    id: 2,
    name: 'Christmas Candle',
    price: 5,
    categoryId: 4,
    description: 'Festive handmade candle perfect for Christmas decorations.',
    stock: 40,
  },
  {
    id: 3,
    name: 'Easter Candle',
    price: 5,
    categoryId: 4,
    description: 'Decorative candle inspired by Easter themes.',
    stock: 40,
  },
  {
    id: 4,
    name: 'Krispo Candle',
    price: 5,
    categoryId: 3,
    description: 'Modern decorative candle with textured design.',
    stock: 35,
  },
  {
    id: 5,
    name: 'Candle Lavanda Hous',
    price: 5,
    categoryId: 1,
    description: 'Relaxing lavender scented candle.',
    stock: 45,
  },
  {
    id: 6,
    name: 'Candle Vanilla Style',
    price: 5,
    categoryId: 1,
    description: 'Classic vanilla scented candle.',
    stock: 45,
  },
  {
    id: 7,
    name: 'Candle Rose Style',
    price: 5,
    categoryId: 1,
    description: 'Romantic rose scented candle.',
    stock: 40,
  },
  {
    id: 8,
    name: 'Candle Basic',
    price: 5,
    categoryId: 2,
    description: 'Simple eco-friendly soy candle.',
    stock: 60,
  },
];

// Categorii (dacă vrei să folosești)
const categories = [
  { id: 1, name: 'Scented Candles', description: 'Relaxing & natural aromas' },
  { id: 2, name: 'Soy Candles', description: 'Eco-friendly & clean burn' },
  { id: 3, name: 'Decor Candles', description: 'Minimal & artistic designs' },
  {
    id: 4,
    name: 'Seasonal Candles',
    description: 'Limited edition collections',
  },
  { id: 5, name: 'Gift Sets', description: 'Perfect handmade gifts' },
  { id: 6, name: 'Custom Candles', description: 'Personalized for you' },
];
