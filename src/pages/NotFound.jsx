import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1 style={{ fontSize: '3.5rem', color: '#ef4444' }}>404</h1>
      <p style={{ margin: '1rem 0' }}>The page you are looking for does not exist.</p>
      <Link to="/" className="btn" style={{ display: 'inline-block', width: 'auto' }}>Back to Home</Link>
    </div>
  );
}