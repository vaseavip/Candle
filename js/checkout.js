/*
1. Variabile / constante
*/

// Produse
const PRODUCT1_NAME = 'Candle "House"';
const PRODUCT1_PRICE = 6;
let PRODUCT1_QTY = 1;

const PRODUCT2_NAME = 'Easter Candle';
const PRODUCT2_PRICE = 5;
let PRODUCT2_QTY = 2;

// TVA și monedă
const VAT_RATE = 0.2;
const CURRENCY = 'EUR';
const USD_PER_EUR = 1.16;

// Cupon
const RAW_COUPON = 'SAVE10';

// typeof – exemple
console.log(typeof PRODUCT1_NAME);
console.log(typeof PRODUCT1_PRICE);
console.log(typeof PRODUCT1_QTY);
console.log(typeof VAT_RATE);
console.log(typeof CURRENCY);

/*
 2. Funcția normalizeCoupon
*/
function normalizeCoupon(code) {
  return code.trim().toUpperCase();
}

/*
 3. Validare cupon
*/
function validateAndNotify() {
  const promoInput = document.querySelector('.input-group input').value;

  const normalizedCode = normalizeCoupon(promoInput);

  if (normalizedCode === RAW_COUPON) {
    alert('Codul introdus este valid.');
  } else {
    alert('Codul introdus nu este valid.');
  }
}

/*
 4. Event listener pe butonul Apply
*/
const promoForm = document.querySelector('.input-group').closest('form');

promoForm.addEventListener('submit', function (event) {
  event.preventDefault(); // prevenim refresh-ul paginii
  validateAndNotify();
});
