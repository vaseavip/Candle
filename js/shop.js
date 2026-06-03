document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products');

  if (!container) return;

  function getCategoryFromQueryString() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
  }

  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCartCount() {
    const cart = getCart();

    const totalQty = cart.reduce((sum, item) => {
      return sum + item.qty;
    }, 0);

    const cartCount = document.getElementById('cartCount');

    if (cartCount) {
      cartCount.innerText = totalQty;
    }
  }

  function showMessage(btn, text) {
    const msg = document.createElement('div');

    msg.className = 'cart-msg';
    msg.innerText = text;

    btn.parentElement.appendChild(msg);

    setTimeout(() => {
      msg.remove();
    }, 2000);
  }

  function addToCart(product) {
    const cart = getCart();

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.image,
        qty: 1,
      });
    }

    saveCart(cart);
    updateCartCount();
  }

  function renderProducts() {
    container.innerHTML = '';

    const selectedCategory = getCategoryFromQueryString();

    const filteredProducts = selectedCategory
      ? products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase(),
        )
      : products;

    if (filteredProducts.length === 0) {
      container.innerHTML =
        '<h2 class="text-center">No products found in this category.</h2>';
      return;
    }

    filteredProducts.forEach((product) => {
      // afișăm doar produsele disponibile
      if (!product.inStock) return;

      const card = document.createElement('div');

      card.className = 'product-card';
      card.dataset.id = product.id;

      card.innerHTML = `
        <img class="product-img" src="${product.image}" alt="${product.name}">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${product.currency}${product.price}</p>

        <button class="add-btn add-to-cart" data-id="${product.id}">
          Add to Cart
        </button>
      `;

      const btn = card.querySelector('.add-to-cart');

      btn.addEventListener('click', () => {
        addToCart(product);
        showMessage(btn, 'Product added to cart!');
      });

      container.appendChild(card);
    });

    updateCartCount();
  }

  renderProducts();
});
