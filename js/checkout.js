// Produsele
const allProducts = [
  { name: 'Candle "House"', price: 6, qty: 1 },
  { name: 'Easter Candle', price: 5, qty: 2 },
  { name: 'Scented Candle', price: 8, qty: 15 },
  { name: 'Candle Lavanda Hous', price: 20, qty: 7 },
  { name: 'Vase', price: 12, qty: 5 },
  { name: 'Candle Vanilla style', price: 10, qty: 25 },
  { name: 'Candle Rose style', price: 3, qty: 30 },
  { name: 'Candle Bassic', price: 7, qty: 12 },
  { name: 'Candle Holder', price: 9, qty: 8 },
  { name: 'Candle Statue', price: 15, qty: 3 },
];

// TVA si moneda
const VAT_RATE = 0.2;
const CURRENCY = 'EUR';
const USD_PER_EUR = 1.16;

// Cupoane valide
const VALID_COUPONS = ['SAVE10', 'SAVE15', 'FREESHIP'];

/*
2. Functia normalizeCoupon
*/
function normalizeCoupon(coupon) {
  return coupon.trim().toUpperCase();
}

/*
3. Functia isValidCoupon
*/
function isValidCoupon(code) {
  for (const coupon of VALID_COUPONS) {
    if (coupon === code) {
      return true;
    }
  }
  return false;
}

/*
4. Functia validateAndNotify
*/
function validateAndNotify() {
  // 1. Citim valoarea din input
  const promoInput = document.querySelector('.input-group input').value;

  // 2. Normalizăm cuponul
  const normalizedCoupon = normalizeCoupon(promoInput);

  // 3. Verificam daca cuponul este valid
  if (isValidCoupon(normalizedCoupon)) {
    if (normalizedCoupon === 'SAVE10') {
      alert('Cuponul dvs. oferă 10% reducere.');
    } else if (normalizedCoupon === 'SAVE15') {
      alert('Cuponul dvs. oferă 15% reducere.');
    } else if (normalizedCoupon === 'FREESHIP') {
      alert('Cuponul dvs. oferă livrare gratuită.');
    }
  } else {
    alert('Cuponul introdus nu este valid.');
  }
}

/*
5. Event listener pe butonul Apply
*/
const promoForm = document.querySelector('.input-group').closest('form');
promoForm.addEventListener('submit', function (event) {
  event.preventDefault(); // prevenim refresh-ul paginii
  validateAndNotify();
});

/*
6. Calcul valoare totala stoc
*/
function calculateTotalStockValue(products) {
  let totalValue = 0;
  for (const product of products) {
    totalValue += product.price * product.qty;
  }
  console.log(`Valoarea totală a stocului: ${totalValue} ${CURRENCY}`);
}
calculateTotalStockValue(allProducts);

/*
7. Produse cu stoc redus (<10)
*/
const lowStock = allProducts.filter((product) => product.qty < 10);
console.log('Produse cu stoc redus (<10):', lowStock);

/*
8. Functia findProductByName
*/
function findProductByName(list, searchName) {
  const lowerSearch = searchName.trim().toLowerCase();
  for (const product of list) {
    if (product.name.trim().toLowerCase() === lowerSearch) {
      return product;
    }
  }
  return null;
}

// Exemplu de test
console.log(findProductByName(allProducts, 'vase')); // returnează obiectul Vase
console.log(findProductByName(allProducts, 'unknown')); // returnează null
