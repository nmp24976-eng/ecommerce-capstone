import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="nav-brand">
        <ShoppingBag color="#2563eb" size={24} />
        <span>StoreHub</span>
      </Link>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Shop</Link>
        <Link to="/cart" className="nav-link cart-link">
          <ShoppingCart size={22} />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </nav>
    </header>
  );
}