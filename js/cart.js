// js/cart.js

// citim produsele din localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// render cart
function renderCart() {
  const container = document.getElementById('cartItems');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty</p>';
    updateTotal();
    return;
  }

  cart.forEach((product) => {
    const item = document.createElement('div');
    item.className = 'cart-item';

    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">${product.price} €</p>
      </div>

      <div class="quantity">
        <button onclick="changeQty(${product.id}, -1)">-</button>
        <span>${product.qty}</span>
        <button onclick="changeQty(${product.id}, 1)">+</button>
      </div>

      <button class="remove-btn" onclick="removeItem(${product.id})">Remove</button>
    `;

    container.appendChild(item);
  });

  updateTotal();
}

// schimbă cantitatea
function changeQty(id, amount) {
  cart.forEach((product) => {
    if (product.id === id) {
      product.qty += amount;
      if (product.qty < 1) product.qty = 1;
    }
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

// șterge produs
function removeItem(id) {
  cart = cart.filter((product) => product.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

// total + subtotal
function updateTotal() {
  let subtotal = 0;
  cart.forEach((product) => (subtotal += product.price * product.qty));
  let shipping = subtotal > 0 ? 10 : 0;
  let total = subtotal + shipping;

  document.getElementById('subtotal').innerText = subtotal + ' €';
  document.getElementById('total').innerText = total + ' €';
}

// actualizare badge cart pe toate paginile
function updateCartBadge() {
  let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.getElementById('cartCount');
  if (cartCount) cartCount.innerText = totalQty;
}

renderCart();
updateCartBadge();

// facem functiile globale pentru onclick
window.changeQty = changeQty;
window.removeItem = removeItem;

function updateTotal() {
  let subtotal = 0;

  cart.forEach((product) => {
    subtotal += product.price * product.qty;
  });

  let shipping = subtotal > 0 ? 10 : 0;
  let total = subtotal + shipping;

  document.getElementById('subtotal').innerText = subtotal + ' €';
  document.getElementById('total').innerText = total + ' €';
}

// pornim renderul cartului
renderCart();

// funcția de verificare stoc
function isInStock(product, requestedQty) {
  if (!product || typeof requestedQty !== 'number' || requestedQty <= 0) {
    console.warn('Date invalide la isInStock');
    return false;
  }
  return product.quantity >= requestedQty;
}

//test removeItem
console.log('--- TEST removeItem ---');
console.log('Cart inițial:', JSON.stringify(cart, null, 2));
removeItem(cart[0].id);
console.log('Cart după removeItem:', JSON.stringify(cart, null, 2));
