// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('productGrid');

  // ID-urile celor 4 produse de pe pagina principală
  const featuredIds = [5, 6, 7, 8];

  // filtrăm doar produsele dorite
  const featuredProducts = products.filter((p) => featuredIds.includes(p.id));

  // generăm cardurile
  featuredProducts.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    // setăm imaginea corectă pentru fiecare produs
    let imgPath = '';
    switch (product.id) {
      case 5:
        imgPath = './img/lum0.png';
        break;
      case 6:
        imgPath = './img/lum5.png';
        break;
      case 7:
        imgPath = './img/lum6.png';
        break;
      case 8:
        imgPath = './img/lum7.png';
        break;
    }

    card.innerHTML = `
      <img src="${imgPath}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: ${product.price} EURO</p>
      <button onclick="addToCart(${product.id})">Adaugă în coș</button>
    `;

    productGrid.appendChild(card);
  });

  // actualizăm badge-ul la încărcarea paginii
  updateCartCount();
});
// funcția de verificare stoc
function isInStock(product, requestedQty) {
  if (!product || typeof requestedQty !== 'number' || requestedQty <= 0) {
    console.warn(
      'Date invalide la verificarea stocului:',
      product,
      requestedQty,
    );
    return false;
  }
  return product.quantity >= requestedQty;
}
// funcția de adăugare în coș
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    let imgPath = '';
    switch (product.id) {
      case 5:
        imgPath = './img/lum0.png';
        break;
      case 6:
        imgPath = './img/lum5.png';
        break;
      case 7:
        imgPath = './img/lum6.png';
        break;
      case 8:
        imgPath = './img/lum7.png';
        break;
    }

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imgPath,
      qty: 1,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount(); // actualizăm badge-ul
  alert('Product added to cart!');
}

// funcția pentru badge-ul cu numărul de produse
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.innerText = totalQty;
  }
}

window.addToCart = addToCart;
//test
console.log('--- TEST isInStock ---');
console.log(isInStock(products[0], 5), 'așteptat true');
console.log(isInStock(products[4], 47), 'așteptat false');
