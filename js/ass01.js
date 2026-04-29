// Tema: Modelarea datelor și funcții eCommerce

// Produse
const products = [
  {
    id: 1,
    name: 'Candle Statue',
    price: 6,
    categoryId: 3,
    description: "Handmade candle with 'Statue' design.",
    quantity: 10,
  },
  {
    id: 2,
    name: 'Christmas Candle',
    price: 5,
    categoryId: 4,
    description: 'Festive handmade candle perfect for Christmas decorations.',
    quantity: 15,
  },
  {
    id: 3,
    name: 'Easter Candle',
    price: 5,
    categoryId: 4,
    description: 'Decorative candle inspired by Easter themes.',
    quantity: 8,
  },
  {
    id: 4,
    name: 'Krispo Candle',
    price: 5,
    categoryId: 3,
    description: 'Modern decorative candle with textured design.',
    quantity: 20,
  },
  {
    id: 5,
    name: 'Lavender House Candle',
    price: 5,
    categoryId: 1,
    description: 'Relaxing lavender scented candle.',
    quantity: 5,
  },
  {
    id: 6,
    name: 'Vanilla Style Candle',
    price: 5,
    categoryId: 1,
    description: 'Classic vanilla scented candle.',
    quantity: 45,
  },
  {
    id: 7,
    name: 'Rose Style Candle',
    price: 5,
    categoryId: 1,
    description: 'Romantic rose scented candle.',
    quantity: 40,
  },
  {
    id: 8,
    name: 'Basic Candle',
    price: 5,
    categoryId: 2,
    description: 'Simple eco-friendly soy candle.',
    quantity: 60,
  },
];

// Utilizator
const user = {
  username: 'student101',
  email: '[student101@example.com](mailto:student101@example.com)',
  isLoggedIn: true,
};

// Coș
const cart = {
  items: [],
  totalPrice: 0,
};

// 1. isInStock
function isInStock(product, requestedQty) {
  if (!product || typeof requestedQty !== 'number' || requestedQty <= 0) {
    console.warn('Date invalide la verificarea stocului');
    return false;
  }
  return product.quantity >= requestedQty;
}

// Helper: calcul total coș
function calculateCartTotal(cart) {
  return cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

// 2. addToCart
function addToCart(cart, product, qty) {
  if (!cart || !product || typeof qty !== 'number' || qty <= 0) {
    console.warn('Date invalide la addToCart');
    return;
  }

  const cartItem = cart.items.find((item) => item.productId === product.id);

  //verificăm totalul cerut (existent + nou)
  const totalRequested = cartItem ? cartItem.quantity + qty : qty;

  if (!isInStock(product, totalRequested)) {
    console.log(`Nu sunt suficiente bucăți în stoc pentru ${product.name}.`);
    return;
  }

  if (cartItem) {
    cartItem.quantity += qty;
  } else {
    cart.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
    });
  }

  product.quantity -= qty;
  cart.totalPrice = calculateCartTotal(cart);

  console.log(`${qty}x ${product.name} adăugat în coș.`);
}

// 3. removeFromCart
function removeFromCart(cart, productId) {
  if (!cart || typeof productId !== 'number') {
    console.warn('Date invalide la removeFromCart');
    return;
  }

  const index = cart.items.findIndex((item) => item.productId === productId);

  if (index === -1) {
    console.log(`Produsul cu id=${productId} nu există în coș.`);
    return;
  }

  const removedItem = cart.items.splice(index, 1)[0];

  // returnăm cantitatea în stoc
  const originalProduct = products.find((p) => p.id === productId);
  if (originalProduct) {
    originalProduct.quantity += removedItem.quantity;
  }

  cart.totalPrice = calculateCartTotal(cart);

  console.log(`Produsul ${removedItem.name} a fost eliminat din coș.`);
}

// 4. getCheapProducts (arrow)
const getCheapProducts = (productsList, limit) => {
  if (!Array.isArray(productsList) || typeof limit !== 'number') {
    console.warn('Date invalide la getCheapProducts');
    return [];
  }

  return productsList.filter((p) => p.price < limit);
};

// 5. getProductsByCategory
const getProductsByCategory = function (productsList, categoryId) {
  if (!Array.isArray(productsList) || typeof categoryId !== 'number') {
    console.warn('Date invalide la getProductsByCategory');
    return [];
  }

  return productsList.filter(function (p) {
    return p.categoryId === categoryId;
  });
};

// ================= TESTE =================

console.log('--- TEST isInStock ---');
console.log(isInStock(products[0], 5), 'așteptat true');
console.log(isInStock(products[4], 10), 'așteptat false');

console.log('--- TEST addToCart ---');
addToCart(cart, products[0], 2);
addToCart(cart, products[0], 20); // stoc insuficient
addToCart(cart, products[0], 3); // cumul corect
addToCart(cart, products[1], 5);

console.log('Cart după adăugări:', JSON.stringify(cart, null, 2));

console.log('--- TEST removeFromCart ---');
removeFromCart(cart, 1);
removeFromCart(cart, 99);

console.log('Cart după eliminări:', JSON.stringify(cart, null, 2));

console.log('--- TEST getCheapProducts ---');
console.log(getCheapProducts(products, 25));
console.log(getCheapProducts(products, 10));

console.log('--- TEST getProductsByCategory ---');
console.log(getProductsByCategory(products, 1)); // corect
console.log(getProductsByCategory(products, 99)); // categorie inexistentă

console.log('--- Test total coș gol ---');
const emptyCart = { items: [], totalPrice: 0 };
console.log(calculateCartTotal(emptyCart), 'așteptat 0');

console.log('--- Stare finală produse ---');
console.table(products);
