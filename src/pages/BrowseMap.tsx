import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Filter } from 'lucide-react';
import './BrowseMap.css';

// Mock Data for properties
const MOCK_PROPERTIES = [
  { id: 1, title: 'Agricultural Land', sizeGajam: 500, priceInr: 1250000, location: 'Warangal Highway', verified: true, coords: { x: 30, y: 40 } },
  { id: 2, title: 'Residential Plot', sizeGajam: 200, priceInr: 800000, location: 'Shamshabad', verified: true, coords: { x: 60, y: 20 } },
  { id: 3, title: 'Commercial Space', sizeGajam: 1000, priceInr: 5000000, location: 'Gachibowli', verified: false, coords: { x: 45, y: 70 } },
];

export default function BrowseMap() {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<typeof MOCK_PROPERTIES[0] | null>(null);

  return (
    <div className="map-view-container animate-fade-in">
      {/* Mobile-first search and filter bar */}
      <div className="map-search-bar">
        <div className="search-input-wrapper">
          <Search size={20} className="text-muted" />
          <input type="text" placeholder="Search locations, survey numbers..." className="map-search-input" />
        </div>
        <button className="btn btn-outline filter-btn">
          <Filter size={20} />
          <span className="hide-mobile">Filters</span>
        </button>
      </div>

      <div className="map-content">
        {/* Abstract Map Area (Mock Google Maps) */}
        <div className="map-area" onClick={() => setSelectedProperty(null)}>
          <div className="map-overlay-text">Google Maps Integration (Mock)</div>
          
          {MOCK_PROPERTIES.map(prop => (
            <div 
              key={prop.id}
              className={`map-pin ${selectedProperty?.id === prop.id ? 'active' : ''}`}
              style={{ left: `${prop.coords.x}%`, top: `${prop.coords.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProperty(prop);
              }}
            >
              <MapPin size={32} className={prop.verified ? 'text-success' : 'text-warning'} />
              <div className="pin-pulse"></div>
            </div>
          ))}
        </div>

        {/* Selected Property Details Drawer */}
        <div className={`property-drawer card ${selectedProperty ? 'open' : ''}`}>
          {selectedProperty ? (
            <>
              <div className="drawer-header">
                <h3>{selectedProperty.title}</h3>
                {selectedProperty.verified && <span className="verify-badge">Verified ✓</span>}
              </div>
              <p className="text-muted mb-2">{selectedProperty.location}</p>
              
              <div className="property-stats grid-2-col mb-4">
                <div className="stat-box">
                  <span className="stat-label">Size</span>
                  <strong>{selectedProperty.sizeGajam} Gajam</strong>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Total Price</span>
                  <strong className="text-primary">₹{selectedProperty.priceInr.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div className="drawer-actions" style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <button className="btn btn-primary w-full" onClick={() => navigate(`/property/${selectedProperty.id}`)}>
                  View Full Details
                </button>
                <button className="btn btn-secondary w-full">Contact Seller</button>
              </div>
            </>
          ) : (
            <div className="empty-drawer text-center">
              <MapPin size={48} className="text-muted mx-auto mb-3 opacity-50" />
              <p className="text-muted">Select a pin on the map to view property details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
