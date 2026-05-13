let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center;">Cart is empty</p>`;
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
        <button class="qty-btn" data-id="${product.id}" data-action="minus">-</button>
        <span>${product.qty}</span>
        <button class="qty-btn" data-id="${product.id}" data-action="plus">+</button>
      </div>

      <button class="remove-btn" data-id="${product.id}">
        Remove
      </button>
    `;

    container.appendChild(item);
  });

  attachEvents();
  updateTotal();
}

// EVENT HANDLERS (IMPORTANT FIX)
function attachEvents() {
  document.querySelectorAll('.qty-btn').forEach((btn) => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;

      changeQty(id, action === 'plus' ? 1 : -1);
    };
  });

  document.querySelectorAll('.remove-btn').forEach((btn) => {
    btn.onclick = () => {
      removeItem(Number(btn.dataset.id));
    };
  });
}

function changeQty(id, amount) {
  const item = cart.find((p) => p.id === id);
  if (!item) return;

  item.qty += amount;

  if (item.qty < 1) item.qty = 1;

  saveCart();
}

function removeItem(id) {
  cart = cart.filter((p) => p.id !== id);
  saveCart();
}

function updateTotal() {
  let subtotal = 0;

  cart.forEach((p) => {
    subtotal += p.price * p.qty;
  });

  const shipping = subtotal > 0 ? 10 : 0;

  document.getElementById('subtotal').innerText = subtotal + ' €';
  document.getElementById('total').innerText = subtotal + shipping + ' €';
}

function updateCartBadge() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cartCount');
  if (badge) badge.innerText = totalQty;
}

renderCart();
updateCartBadge();
