// ====== React + Hooks ======
import React, { useState, useEffect } from 'react';
import '../styles/resort.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import ski from '../assets/images/UI/ski.png';
import Card from '../components/card';

type Resort = {
  name: string;
  trails_open: number;
  trails_total: number;
  lifts_open: number;
  lifts_total: number;
  gondolas_open: number;
  gondolas_total: number;
  snowpack_in: number;
  hours: string;
  website: string;
};

export default function Resort() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [pastSearches, setPastSearches] = useState<Resort[]>([]);

  // ===== Load Saved History from LocalStorage =====
  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setQuery(JSON.parse(storedHistory)[0] || '');
    }

    const storedResorts = localStorage.getItem('resortHistory');
    if (storedResorts) {
      setPastSearches(JSON.parse(storedResorts));
    }
  }, []);

  // ===== Handle Search Form Submit =====
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (!trimmed) return;

    setQuery(trimmed);
    setSearch('');

    const updatedSearches = [trimmed, ...new Set([...(JSON.parse(localStorage.getItem('searchHistory') || '[]')).filter((q: string) => q.toLowerCase() !== trimmed.toLowerCase())])];
    localStorage.setItem('searchHistory', JSON.stringify(updatedSearches));
  };

  // ===== Fetch Resort on Search =====
  useEffect(() => {
    if (!query.trim()) return;

    const fetchResorts = async () => {
      try {
        const gqlQuery = {
          query: `
            query ($name: String!) {
              resort(name: $name) {
                name
                trails_open
                trails_total
                lifts_open
                lifts_total
                gondolas_open
                gondolas_total
                snowpack_in
                hours
                website
              }
            }
          `,
          variables: { name: query },
        };

        const res = await fetch('http://127.0.0.1:5000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(gqlQuery),
        });

        const result = await res.json();
        const resort = result?.data?.resort;

        if (resort) {
          setResorts([resort]);

          const updated = [resort, ...pastSearches.filter((r) => r.name !== resort.name)];
          setPastSearches(updated);
          localStorage.setItem('resortHistory', JSON.stringify(updated));
        } else {
          setResorts([]);
        }
      } catch (err) {
        console.error('❌ Resort fetch error:', err);
      }
    };

    fetchResorts();
  }, [query]);

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
      <div className="cardlist-wrapper">
        {!query.trim() && resorts.length === 0 && (
          <div className="no-results-message fade-in">
            <p>🔍 Start typing to search for a resort.</p>
          </div>
        )}

        {query.trim() && resorts.length > 0 &&
          resorts.map((resort, index) => (
            <Card
              key={index}
              title={resort.name}
              icons={
                <FontAwesomeIcon icon={faPlus} className="add-button" title="Add to Favorites" />
              }
            >
              <div className="resort-info">
                <ul className="resort-stats">
                  <li><strong>Snowpack:</strong> {resort.snowpack_in}"</li>
                  <li><strong>Lifts:</strong> {resort.lifts_open} / {resort.lifts_total}</li>
                  <li><strong>Gondolas:</strong> {resort.gondolas_open} / {resort.gondolas_total}</li>
                  <li><strong>Trails:</strong> {resort.trails_open} / {resort.trails_total}</li>
                  <li><strong>Hours:</strong> {resort.hours}</li>
                </ul>
                <a
                  href={resort.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resort-website-button"
                >
                  Visit Website
                </a>
              </div>
            </Card>
          ))}

        {/* Ski Divider */}
        {pastSearches.length > 0 && (
          <div className="ski-divider">
            <img src={ski} alt="Ski Divider" />
          </div>
        )}

        {/* Persistent Past Searches */}
        {pastSearches.length > 0 && (
          <div className="past-searches">
            <h4>Past Searches</h4>
            {pastSearches.map((resort, index) => (
              <Card
                key={index}
                title={resort.name}
                icons={
                  <FontAwesomeIcon
                    icon={faArrowsRotate}
                    className="refresh-button"
                    title="Refresh stats"
                    onClick={() => {
                      // Refresh logic will be implemented later
                    }}
                  />
                }
              >
                <div className="resort-info past-search">
                  <ul className="resort-stats">
                    <li><strong>Snowpack:</strong> {resort.snowpack_in}"</li>
                    <li><strong>Lifts:</strong> {resort.lifts_open}/{resort.lifts_total}</li>
                    <li><strong>Gondolas:</strong> {resort.gondolas_open}/{resort.gondolas_total}</li>
                    <li><strong>Trails:</strong> {resort.trails_open}/{resort.trails_total}</li>
                    <li><strong>Hours:</strong> {resort.hours}</li>
                  </ul>
                  <a
                    href={resort.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resort-website-button"
                  >
                    Visit Website
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
