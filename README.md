# 🕯️ Candle — E-commerce Store

A full-stack e-commerce web app for a candle shop, built as a course capstone project. The repo contains **two parallel front-end implementations** of the same store (React and vanilla JS) sharing one Node/Express backend.

## Project Structure

```
Candle/
├── Candle-React/candle-react/   # React + TypeScript front end (Vite)
│   └── backend/                 # Express REST API (auth, products, cart)
├── Candle-VanillaJS/            # HTML/CSS/SCSS + vanilla JS front end
└── render.yaml                  # Render deployment config for the API
```

## Tech Stack

**Frontend (React version)**
- React 19 + TypeScript
- Vite
- React Router
- Bootstrap 5

**Frontend (Vanilla JS version)**
- HTML5, SCSS, vanilla JavaScript

**Backend**
- Node.js + Express
- JWT authentication (`jsonwebtoken`)
- Password hashing with `bcryptjs`
- File uploads with `multer`
- JSON file storage for products/users/carts

## Features

- Product catalog with categories
- Shopping cart & wishlist
- User authentication (register/login) with JWT
- Checkout flow
- Responsive layout across product, cart, checkout, and contact pages

## Getting Started

### Backend

```bash
cd Candle-React/candle-react/backend
npm install
cp .env.example .env   # fill in your own secrets
node server.js
```

### React frontend

```bash
cd Candle-React/candle-react
npm install
cp .env.example .env.local   # set the API base URL
npm run dev
```

### Vanilla JS frontend

Open `Candle-VanillaJS/index.html` directly in the browser, or serve the folder with any static server.

## Author

**Vasile Perju**
[LinkedIn](https://www.linkedin.com/in/vasile-perju-654353388/) · [GitHub](https://github.com/vaseavip)
