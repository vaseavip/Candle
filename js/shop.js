document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products');

  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCartCount() {
    let cart = getCart();
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.innerText = totalQty;
  }

  function showMessage(btn, text) {
    let msg = document.createElement('div');
    msg.className = 'cart-msg';
    msg.innerText = text;

    btn.parentElement.appendChild(msg);

    setTimeout(() => {
      msg.remove();
    }, 2000);
  }

  function addToCart(product) {
    let cart = getCart();

    let existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }

    saveCart(cart);
    updateCartCount();
  }

  function renderProducts() {
    container.innerHTML = '';

    products.forEach((product) => {
      if (!product.quantity || product.quantity <= 0) return;

      const card = document.createElement('div');
      card.className = 'product-card';

      let imgPath = '';

      switch (product.id) {
        case 1:
          imgPath = './img/lum1.png';
          break;
        case 2:
          imgPath = './img/lum2.png';
          break;
        case 3:
          imgPath = './img/lum3.png';
          break;
        case 4:
          imgPath = './img/lum4.png';
          break;
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
        <p>${product.price} EURO</p>

        <button class="add-btn">Add to Cart</button>
      `;

      const btn = card.querySelector('.add-btn');

      btn.addEventListener('click', () => {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: imgPath,
        });

        showMessage(btn, 'Product added to cart!');
      });

      container.appendChild(card);
    });

    updateCartCount();
  }

  renderProducts();
});
