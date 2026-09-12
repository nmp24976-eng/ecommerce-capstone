import React, { useEffect, useState, useMemo } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData || []);
        setCategories(categoriesData || []);
      })
      .catch((err) => console.error('Error fetching data:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const query = search.trim().toLowerCase();
        if (!query) return true;
        return (
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
        );
      })
      .filter((item) => (category ? item.category === category : true))
      .sort((a, b) => {
        if (sort === 'low-to-high') return a.price - b.price;
        if (sort === 'high-to-low') return b.price - a.price;
        return 0;
      });
  }, [products, search, category, sort]);

  if (loading) return <Loader />;

  return (
    <main className="container">
      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sort={sort}
        setSort={setSort}
      />
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '3rem', color: '#64748b' }}>
          No products found matching "{search}".
        </p>
      ) : (
        <section className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}