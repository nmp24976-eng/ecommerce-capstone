import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductById(id)
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div className="container">Product not found.</div>;

  return (
    <div className="container">
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#64748b', marginBottom: '1.5rem' }}>
        <ArrowLeft size={18} /> Back to Catalog
      </Link>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', background: '#fff', padding: '2rem', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={product.image} alt={product.title} style={{ maxHeight: '320px', maxWidth: '100%', objectFit: 'contain' }} />
        </div>
        <div>
          <span style={{ textTransform: 'uppercase', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>{product.category}</span>
          <h1 style={{ fontSize: '1.6rem', margin: '0.5rem 0' }}>{product.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#eab308', marginBottom: '1rem' }}>
            <Star fill="#eab308" size={18} />
            <span style={{ fontWeight: 600, color: '#1e293b' }}>{product.rating?.rate}</span>
            <span style={{ color: '#64748b' }}>({product.rating?.count} reviews)</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#16a34a', marginBottom: '1rem' }}>${product.price?.toFixed(2)}</div>
          <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>{product.description}</p>
          <button className="btn" style={{ width: 'auto', padding: '0.8rem 2rem' }} onClick={() => addToCart(product)}>
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}