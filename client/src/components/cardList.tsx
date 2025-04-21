import React, { useEffect, useState } from 'react';
import ResortCard from '../components/resortCard';
import '../styles/resort.css';
import ski from '../assets/images//UI/ski.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

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

type CardListProps = {
  search: string;
};

const CardList: React.FC<CardListProps> = ({ search }) => {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [pastSearches, setPastSearches] = useState<Resort[]>([]);

  // ===== Load history from localStorage on mount =====
  useEffect(() => {
    const stored = localStorage.getItem('resortHistory');
    if (stored) {
      setPastSearches(JSON.parse(stored));
    }
  }, []);

  // ===== Fetch on Search =====
  useEffect(() => {
    if (!search.trim()) return;

    const fetchResorts = async () => {
      try {
        const query = {
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
          variables: { name: search },
        };

        const res = await fetch('http://127.0.0.1:5000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(query),
        });

        const result = await res.json();
        const resort = result?.data?.resort;

        if (resort) {
          setResorts([resort]);

          // Update persistent history
          setPastSearches((prev) => {
            const updated = [resort, ...prev.filter((r) => r.name !== resort.name)];
            localStorage.setItem('resortHistory', JSON.stringify(updated));
            return updated;
          });
        } else {
          setResorts([]);
        }
      } catch (err) {
        console.error('❌ Resort fetch error:', err);
      }
    };

    fetchResorts();
  }, [search]);

  return (
    <div className="cardlist-wrapper">
      {/* No search state */}
      {!search.trim() && resorts.length === 0 && (
        <div className="no-results-message fade-in">
          <p>🔍 Start typing to search for a resort.</p>
        </div>
      )}

      {/* Search result */}
      {search.trim() && resorts.length > 0 &&
        resorts.map((resort, index) => (
          <div key={index} className="resort-card">
            <ResortCard {...resort} />
          </div>
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
            <div key={index} className="resort-card past-search-card">
              <div className="resort-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 className="resort-name">{resort.name}</h3>
                  <FontAwesomeIcon
                    icon={faArrowsRotate}
                    className="refresh-button"
                    title="Refresh stats"
                    onClick={() => {
                      // Logic coming later
                    }}
                  />
                </div>

                <ul className="resort-stats">
                  <li><strong>Trails:</strong> {resort.trails_open}/{resort.trails_total}</li>
                  <li><strong>Lifts:</strong> {resort.lifts_open}/{resort.lifts_total}</li>
                  <li><strong>Gondolas:</strong> {resort.gondolas_open}/{resort.gondolas_total}</li>
                  <li><strong>Hours:</strong> {resort.hours}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
