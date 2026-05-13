// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('productGrid');

  // Produsele afișate pe pagina principală
  const featuredIds = [5, 6, 7, 8];

  const featuredProducts = products.filter((p) => featuredIds.includes(p.id));

  // Generare carduri produse
  featuredProducts.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const imgPath = getProductImage(product.id);

    card.innerHTML = `
      <img src="${imgPath}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: ${product.price} EURO</p>

      <button class="add-btn" onclick="addToCart(${product.id}, this)">
        Adaugă în coș
      </button>

      <div class="cart-message"></div>
    `;

    productGrid.appendChild(card);
  });

  // Actualizare badge coș
  updateCartCount();
});

// Funcție pentru imagini produse
function getProductImage(productId) {
  const images = {
    5: './img/lum0.png',
    6: './img/lum5.png',
    7: './img/lum6.png',
    8: './img/lum7.png',
  };

  return images[productId] || './img/default.png';
}

// Verificare stoc
function isInStock(product, requestedQty) {
  if (!product || requestedQty <= 0) {
    return false;
  }

  return product.quantity >= requestedQty;
}

// Adăugare produs în coș
function addToCart(productId, button) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const product = products.find((p) => p.id === productId);

  if (!product) return;

  // verificăm dacă produsul există deja în coș
  const existing = cart.find((item) => item.id === productId);

  // cantitatea dorită
  const requestedQty = existing ? existing.qty + 1 : 1;

  // verificare stoc
  if (!isInStock(product, requestedQty)) {
    showMessage(button, 'Stoc insuficient!', 'error');
    return;
  }

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImage(product.id),
      qty: 1,
    });
  }

  // salvare în localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // actualizare badge
  updateCartCount();

  // notificare modernă
  showMessage(button, 'Produsul a fost adăugat în coș!', 'success');
}

// Actualizare număr produse coș
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartCount = document.getElementById('cartCount');

  if (cartCount) {
    cartCount.innerText = totalQty;
  }
}

// Funcție notificare
function showMessage(button, message, type) {
  const card = button.parentElement;

  const messageBox = card.querySelector('.cart-message');

  messageBox.innerText = message;

  // reset clase
  messageBox.className = 'cart-message';

  // stil mesaj
  if (type === 'success') {
    messageBox.classList.add('success');
  } else {
    messageBox.classList.add('error');
  }

  // afișare
  messageBox.style.opacity = '1';

  // dispariție după 2 secunde
  setTimeout(() => {
    messageBox.style.opacity = '0';
  }, 2000);
}

// acces global
window.addToCart = addToCart;

// Teste
console.log('--- TEST isInStock ---');
console.log(isInStock(products[0], 5), 'așteptat true');
console.log(isInStock(products[4], 47), 'așteptat false');
