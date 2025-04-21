// ====== React + Hooks ======
import React, { useState, useEffect } from 'react';
import '../styles/resort.css';
import CardList from '../components/cardList';
import ski from '../assets/ski.png';

export default function Resort() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  // ====== Load Saved History from LocalStorage ======
  useEffect(() => {
    const stored = localStorage.getItem('searchHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  // ====== Handle Search Form Submit ======
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (!trimmed) return;

    setQuery(trimmed);

    // Add to history with deduplication
    setHistory(prev => {
      const updated = [trimmed, ...prev.filter(item => item.toLowerCase() !== trimmed.toLowerCase())];
      localStorage.setItem('searchHistory', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="resort-page">
      {/* ===== Search Bar ===== */}
      <form className="resort-search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search resorts by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {/* ===== Resort Results ===== */}
      <CardList search={query} />
    </div>
  );
}
