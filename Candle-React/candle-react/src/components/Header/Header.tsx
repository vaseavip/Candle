import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiBars3, HiXMark } from 'react-icons/hi2';

import logo from '../../assets/images/logo.png';
import wishlist from '../../assets/images/wishlist.png';
import cartIcon from '../../assets/images/cart.png';
import profile from '../../assets/images/profile.png';
import { useCart } from '../../context/CartContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <div className="logo-top">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>

      <div className="search-form">
        <input type="search" placeholder="Search..." />
        <button>Search</button>
      </div>

      <div className="topicon">
        <Link to="/wishlist">
          <img src={wishlist} alt="wishlist" />
        </Link>

        <Link to="/cart" className="cart-link">
          <img src={cartIcon} alt="cart" />
          <span className="cart-count">{cartCount}</span>
        </Link>

        <Link to="/login">
          <img src={profile} alt="profile" />
        </Link>
      </div>

      {/* Hamburger */}
      <button className="hamburger" onClick={() => setMenuOpen(true)}>
        <HiBars3 size={32} />
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={() => setMenuOpen(false)}>
          <HiXMark size={32} />
        </button>

        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>

        <NavLink to="/categories" onClick={() => setMenuOpen(false)}>
          Categories
        </NavLink>

        <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
          Shop
        </NavLink>

        <NavLink to="/about" onClick={() => setMenuOpen(false)}>
          About
        </NavLink>

        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
