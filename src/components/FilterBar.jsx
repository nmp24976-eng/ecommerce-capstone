import React from 'react';

export default function FilterBar({ search, setSearch, category, setCategory, categories, sort, setSort }) {
  return (
    <section className="filter-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="select-input">
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c.toUpperCase()}</option>
        ))}
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="select-input">
        <option value="">Sort by Price</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>
    </section>
  );
}