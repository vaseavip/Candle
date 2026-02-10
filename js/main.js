// Variabilă globală pentru suma totală în €
let suma = 0;

// Funcție care adaugă la sumă
function adaugaLaSuma(pret) {
  suma = suma + pret; // adunăm prețul
  console.log('Suma curentă: ' + suma + ' €'); // afișăm în €
}

//Funcție pentru pictograma coș
function openCart() {
  alert('Suma totală a comenzii este: ' + suma + ' €'); // alert în €
}

// Conectăm butoanele Add to Cart
const productButtons = document.querySelectorAll('.product-card button');

productButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // luăm prețul din <p> Price: 5 EURO
    var priceText = this.previousElementSibling.textContent; // ex: "Price: 5 EURO"
    var priceValue = parseFloat(priceText.replace(/[^\d.]/g, '')); // extragem numărul
    adaugaLaSuma(priceValue);
  });
});

// Conectăm pictograma coș din header
var cartIcon = document.querySelector(".topicon a[href='./checkout.html']");
cartIcon.addEventListener('click', function (event) {
  event.preventDefault(); // prevenim navigarea imediată
  openCart();
});
