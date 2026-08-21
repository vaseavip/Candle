export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(errorBody?.message || 'Something went wrong.');
  }

  return response.json();
}

// Products
export function getProducts() {
  return apiRequest('/products');
}

export function getProduct(id: number) {
  return apiRequest(`/products/${id}`);
}

// Categories
export function getCategories() {
  return apiRequest('/categories');
}

// Cart
export interface CheckoutPayload {
  items: { id: number; name: string; price: number; quantity: number }[];
  total: number;
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    zip: string;
  };
}

export function postCart(payload: CheckoutPayload) {
  const token = sessionStorage.getItem('token');

  return apiRequest('/carts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

// Auth
export interface RegisterPayload {
  email: string;
  password: string;
  repeatPassword: string;
  birthDate: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export function registerUser(payload: RegisterPayload) {
  return apiRequest('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: LoginPayload) {
  return apiRequest('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
