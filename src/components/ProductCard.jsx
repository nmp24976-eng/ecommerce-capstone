import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="card">
      <div className="card-img-wrapper">
        <img src={product.image} alt={product.title} className="card-img" loading="lazy" />
      </div>
      <div className="card-content">
        <Link to={`/product/${product.id}`} className="card-title">
          {product.title}
        </Link>
        <div className="card-price">${product.price.toFixed(2)}</div>
        <button className="btn" onClick={() => addToCart(product)}>
          <Plus size={16} /> Add to Cart
        </button>
      </div>
    </article>
  );
}