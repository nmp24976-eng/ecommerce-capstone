import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ margin: '1rem 0', color: '#64748b' }}>Explore our catalog and add some products.</p>
        <Link to="/" className="btn" style={{ display: 'inline-block', width: 'auto' }}>Go to Store</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '1.5rem' }}>Shopping Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.image} alt={item.title} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                <span style={{ fontSize: '0.9rem', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</span>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div className="cart-controls">
                  <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
        <button onClick={clearCart} className="btn btn-danger" style={{ width: 'auto' }}>Clear Cart</button>
        <div style={{ textAlign: 'right' }}>
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
          <button className="btn" style={{ marginTop: '0.8rem', width: '200px' }} onClick={() => alert('Order Placed Successfully!')}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}