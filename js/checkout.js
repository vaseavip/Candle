// ================================
// CONSTANTE
// ================================

const VAT_RATE = 0.2;
const CURRENCY = '€';

const VALID_COUPONS = {
  SAVE10: 0.1,
  SAVE15: 0.15,
  FREESHIP: 0,
};

let discount = 0;

// ================================
// CART FUNCTIONALITY
// ================================

const cartItems = document.querySelectorAll(
  '.card-body .d-flex.justify-content-between.align-items-center',
);

function updateTotals() {
  let total = 0;

  cartItems.forEach((item) => {
    const priceText = item.querySelector('small').textContent;
    const price = parseFloat(priceText);

    const qty = parseInt(item.querySelector('span').textContent);

    const itemTotal = price * qty;

    item.querySelector('strong:last-child').textContent = itemTotal + ' €';

    total += itemTotal;
  });

  if (discount > 0) {
    total = total - total * discount;
  }

  document.querySelector('.fs-5 strong:last-child').textContent =
    total.toFixed(2) + ' €';
}

// ================================
// QUANTITY BUTTONS
// ================================

document.querySelectorAll('.btn-outline-secondary').forEach((btn) => {
  btn.addEventListener('click', function () {
    const item = this.closest('.d-flex');
    const qtyElement = item.querySelector('span');

    let qty = parseInt(qtyElement.textContent);

    if (this.textContent === '+') {
      qty++;
    }

    if (this.textContent === '-' && qty > 1) {
      qty--;
    }

    qtyElement.textContent = qty;

    updateTotals();
  });
});

// ================================
// COUPON SYSTEM
// ================================

const promoForm = document.querySelector('.input-group').closest('form');

promoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const input = document.querySelector('.input-group input');
  const code = input.value.trim().toUpperCase();

  if (VALID_COUPONS[code] !== undefined) {
    discount = VALID_COUPONS[code];

    if (code === 'FREESHIP') {
      alert('Free shipping applied!');
    } else {
      alert('Discount applied: ' + discount * 100 + '%');
    }

    updateTotals();
  } else {
    alert('Invalid coupon');
  }
});

// ================================
// COUNTRY → CITY DROPDOWN
// ================================

const cities = {
  Romania: ['Bucharest', 'Cluj-Napoca', 'Timisoara', 'Iasi'],
  Moldova: ['Chisinau', 'Balti', 'Cahul'],
  Ukraine: ['Kyiv', 'Lviv', 'Odessa'],
};

const countrySelect = document.querySelectorAll('select')[0];
const citySelect = document.querySelectorAll('select')[1];

countrySelect.addEventListener('change', function () {
  const selected = this.value;

  citySelect.innerHTML = `<option selected disabled>City</option>`;

  cities[selected].forEach((city) => {
    const option = document.createElement('option');

    option.value = city;
    option.textContent = city;

    citySelect.appendChild(option);
  });
});

// ================================
// FORM VALIDATION
// ================================

const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const inputs = form.querySelectorAll('input');

  let valid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      input.style.border = '2px solid red';
      valid = false;
    } else {
      input.style.border = '';
    }
  });

  const cardNumber = form.querySelector(
    'input[placeholder="Card Number"]',
  ).value;

  if (cardNumber.length < 12) {
    alert('Card number invalid');
    return;
  }

  if (!valid) {
    alert('Please fill all required fields');
    return;
  }

  placeOrder();
});

// ================================
// PLACE ORDER
// ================================

function placeOrder() {
  const total = document.querySelector('.fs-5 strong:last-child').textContent;

  const order = {
    id: Date.now(),
    total: total,
    date: new Date().toLocaleDateString(),
  };

  localStorage.setItem('lastOrder', JSON.stringify(order));

  alert('Order successful! Total: ' + total);

  location.reload();
}

// ================================
// INITIAL CALCULATION
// ================================

updateTotals();
