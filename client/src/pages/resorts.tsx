import React, { useState } from 'react';
import '../styles/resort.css';
import CardList from '../components/cardList';

export default function Resort() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', search);
  };

  return (
    <div className="resort-page">
      <form className="resort-search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search resorts by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Clean layout — no .resort-carousel around CardList */}
      <CardList search={search} />
    </div>
  );
}
