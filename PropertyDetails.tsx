import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Map, Phone, MessageSquare, Heart, Share2, TrendingUp, Ruler } from 'lucide-react';
import './PropertyDetails.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Mock property data
  const property = {
    id,
    title: 'Premium Agricultural Land',
    location: 'Warangal Highway, TS',
    sizeGajam: 500,
    priceGajam: 25000,
    owner: 'Rahul Sharma',
    verified: true,
    description: 'Fertile agricultural land with clear direct road access. Suitable for farming or future plotting investment.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    insights: {
      avgLocalPrice: 22000,
      roadAccess: 'Yes - 40ft bypass',
      distToCity: '12 km',
      growthPotential: 'High (Upcoming IT Hub)'
    }
  };

  const totalPrice = property.sizeGajam * property.priceGajam;

  return (
    <div className="container mt-4 mb-6 animate-fade-in">
      {/* Top Actions */}
      <div className="flex justify-between items-center mb-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-outline" onClick={() => navigate(-1)}>← Back</button>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" onClick={() => setSaved(!saved)}>
            <Heart size={20} className={saved ? 'text-error' : ''} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button className="btn btn-outline"><Share2 size={20} /></button>
        </div>
      </div>

      <div className="property-grid">
        {/* Left Column: Images & Specs */}
        <div className="property-main">
          <div className="property-image-container mb-4">
            <img src={property.images[0]} alt="Land" className="property-main-img" />
            {property.verified && (
              <div className="verify-badge-large">
                <ShieldCheck size={24} /> Document Verified
              </div>
            )}
          </div>

          <h1 className="section-title mb-2">{property.title}</h1>
          <p className="text-muted mb-4 flex items-center gap-2">
            <Map size={18} /> {property.location}
          </p>

          <div className="grid-2-col mb-6">
            <div className="stat-card">
              <Ruler size={24} className="text-secondary mb-2" />
              <p className="stat-label">Total Size</p>
              <h3>{property.sizeGajam} Gajam</h3>
            </div>
            <div className="stat-card highlight-bg">
              <span className="stat-label">Total Asking Price</span>
              <h2 className="text-primary">₹ {totalPrice.toLocaleString('en-IN')}</h2>
              <p className="text-sm">₹{property.priceGajam.toLocaleString()}/gajam</p>
            </div>
          </div>

          <h2 className="mb-3">Description</h2>
          <p className="text-muted line-height-relaxed mb-6">{property.description}</p>

          {/* Part 16: Dealer AI Insights */}
          <div className="card insights-card mb-6">
            <h3 className="mb-4 flex items-center gap-2 text-secondary">
              <TrendingUp size={24} /> AI Land Dealer Insights
            </h3>
            <ul className="insights-list">
              <li>
                <span>Market Average Price:</span>
                <strong>₹{property.insights.avgLocalPrice.toLocaleString()}/gajam</strong>
                {property.priceGajam > property.insights.avgLocalPrice ? 
                  <span className="text-warning text-sm ml-2">(13% above market)</span> : 
                  <span className="text-success text-sm ml-2">(Great Deal)</span>}
              </li>
              <li>
                <span>Road Access:</span>
                <strong>{property.insights.roadAccess}</strong>
              </li>
              <li>
                <span>Distance to City Center:</span>
                <strong>{property.insights.distToCity}</strong>
              </li>
              <li>
                <span>Future Growth Projection:</span>
                <strong className="text-success">{property.insights.growthPotential}</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Contact & Chat */}
        <div className="property-sidebar">
          <div className="card sticky-card">
            <h3 className="mb-1">Owner Detail</h3>
            <p className="text-muted mb-4">{property.owner}</p>

            <div className="contact-actions mb-4">
              <button className="btn btn-primary w-full mb-3 btn-large">
                <Phone size={20} /> Call Owner Directly
              </button>
              <button 
                className="btn btn-outline w-full btn-large"
                onClick={() => setChatOpen(!chatOpen)}
              >
                <MessageSquare size={20} /> In-App Chat
              </button>
            </div>

            {/* Part 9: Communication Mock Chat */}
            {chatOpen && (
              <div className="chat-window animate-fade-in">
                <div className="chat-header">
                  <strong>Chat with {property.owner}</strong>
                </div>
                <div className="chat-body">
                  <div className="chat-bubble received">
                    Hi! I'm interested in the Warangal property.
                  </div>
                  <div className="chat-bubble sent">
                    Hello! Yes, the property is available and documents are verified. Would you like to schedule a visit?
                  </div>
                </div>
                <div className="chat-input-area">
                  <input type="text" placeholder="Type your message..." className="input-field" />
                  <button className="btn btn-primary">Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
