import { NavLink } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
      <button className="close-menu" onClick={onClose}>
        ✕
      </button>

      <nav>
        <ul>
          <li>
            <NavLink to="/" onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" onClick={onClose}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" onClick={onClose}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={onClose}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={onClose}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MobileMenu;
