class Product {
  #quantity; // câmp privat - nu poate fi accesat direct din exterior

  constructor(id, name, price, categoryId, description, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
    this.description = description;
    this.#quantity = quantity;
  }

  // Getter pentru a citi stocul (fără a permite modificarea directă)
  get quantity() {
    return this.#quantity;
  }

  // Scade stocul produsului
  decreaseStock(qty) {
    if (typeof qty !== 'number' || qty <= 0) {
      console.warn('Cantitate invalidă pentru decreaseStock');
      return false;
    }

    if (qty > this.#quantity) {
      console.warn('Stoc insuficient');
      return false;
    }

    this.#quantity -= qty;
    return true;
  }

  // Crește stocul produsului
  increaseStock(qty) {
    if (typeof qty !== 'number' || qty <= 0) {
      console.warn('Cantitate invalidă pentru increaseStock');
      return false;
    }

    this.#quantity += qty;
    return true;
  }
}

// Clasa User

class User {
  #isLoggedIn = false; // câmp privat

  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  // Getter pentru status login
  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  // Logare utilizator
  login() {
    if (this.#isLoggedIn) {
      console.warn('Utilizatorul este deja logat');
      return;
    }
    this.#isLoggedIn = true;
  }

  // Delogare utilizator
  logout() {
    if (!this.#isLoggedIn) {
      console.warn('Utilizatorul este deja delogat');
      return;
    }
    this.#isLoggedIn = false;
  }

  // Polimorfism: User nu are discount
  getDiscount() {
    return 0;
  }
}

// Clasa Admin (moștenire)

// Demonstrează MOȘTENIREA: Admin extinde User
class Admin extends User {
  constructor(username, email, role) {
    super(username, email);
    this.role = role;
  }

  // Adaugă produs nou în listă
  addNewProduct(products, product) {
    if (!Array.isArray(products)) {
      console.warn('Lista de produse invalidă');
      return;
    }

    if (!(product instanceof Product)) {
      console.warn('Produs invalid');
      return;
    }

    products.push(product);
  }

  // Polimorfism: Admin are discount
  getDiscount() {
    return 0.1;
  }
}

// Clasa Cart

class Cart {
  constructor() {
    this.items = [];
  }

  // Adaugă produs în coș
  addProduct(product) {
    if (!(product instanceof Product)) {
      console.warn('Produs invalid');
      return;
    }

    if (product.quantity <= 0) {
      console.warn('Produsul nu mai este în stoc');
      return;
    }

    const existing = this.items.find((item) => item.product.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }

    // Scade stocul produsului
    product.decreaseStock(1);
  }

  // Elimină produs din coș
  removeProduct(product) {
    if (!(product instanceof Product)) {
      console.warn('Produs invalid');
      return;
    }

    const item = this.items.find((item) => item.product.id === product.id);

    if (item) {
      // Returnează stocul înapoi
      product.increaseStock(item.quantity);
    }

    this.items = this.items.filter((item) => item.product.id !== product.id);
  }

  // Calculează totalul
  getTotal(user) {
    const subtotal = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    const discount = user ? user.getDiscount() : 0;

    return subtotal * (1 - discount);
  }
}

// TESTE

// Creare produse
const product1 = new Product(1, 'Candle Statue', 6, 3, 'Decor', 10);
const product2 = new Product(2, 'Christmas Candle', 5, 4, 'Decor', 15);
const product3 = new Product(3, 'Easter Candle', 5, 4, 'Decor', 8);

// Creare utilizatori
const user1 = new User('student101', 'student@example.com');
const admin1 = new Admin('admin', 'admin@example.com', 'superadmin');

// Creare coș
const cart1 = new Cart();

// Test login/logout

console.log('Test login');
user1.login();
console.log(user1.isLoggedIn); // true

console.log('Test logout');
user1.logout();
console.log(user1.isLoggedIn); // false

// Test stoc

console.log('Test decrease stock');
product1.decreaseStock(2);
console.log(product1.quantity); // 8

console.log('Test increase stock');
product1.increaseStock(5);
console.log(product1.quantity); // 13

// Edge case
console.log('Test invalid stock');
product1.decreaseStock(-5);

// Test Admin

const products = [product1, product2];
admin1.addNewProduct(products, product3);
console.log(products.length); // 3

// Test polimorfism

console.log(user1.getDiscount()); // 0
console.log(admin1.getDiscount()); // 0.1

// Test Cart

cart1.addProduct(product1);
cart1.addProduct(product2);

console.log(cart1.items.length); // 2

console.log('Total fără discount:', cart1.getTotal(null));
console.log('Total user:', cart1.getTotal(user1));
console.log('Total admin:', cart1.getTotal(admin1));

cart1.removeProduct(product1);
console.log(cart1.items.length); // 1
