import { Link } from 'react-router-dom';
import { ShieldCheck, Map, Handshake, ChevronRight } from 'lucide-react';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content animate-fade-in">
          <h1 className="hero-title">
            Direct Land Deals. <br/>
            <span className="text-highlight">Zero Brokers. 100% Verified.</span>
          </h1>
          <p className="hero-subtitle">
            Buy and sell land directly. We verify the documents to ensure pure transparency. Your trust is our priority.
          </p>
          <div className="hero-actions gap-4">
            <Link to="/buy" className="btn btn-primary btn-large mb-2">
              <Map size={20} />
              Browse Lands
            </Link>
            <Link to="/sell" className="btn btn-secondary btn-large">
              Sell Your Land
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="features bg-section">
        <div className="container">
          <h2 className="section-title text-center mb-6">Why Choose LandDirect?</h2>
          <div className="features-grid">
            <div className="card feature-card">
              <div className="feature-icon bg-primary-light">
                <Handshake size={32} className="text-primary" />
              </div>
              <h3 className="feature-title">No Middlemen</h3>
              <p className="feature-desc">Connect directly with buyers and sellers. Keep 100% of your money. No hidden commission fees.</p>
            </div>
            
            <div className="card feature-card">
              <div className="feature-icon bg-secondary-light">
                <ShieldCheck size={32} className="text-secondary" />
              </div>
              <h3 className="feature-title">AI Verified Docs</h3>
              <p className="feature-desc">Every listing goes through our document verification system to ensure ownership authenticity.</p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon bg-success-light">
                <Map size={32} className="text-success" />
              </div>
              <h3 className="feature-title">Map-First Discovery</h3>
              <p className="feature-desc">Find exactly where the land is located, view boundaries, and assess nearby roads instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta text-center">
        <div className="container">
          <h2 className="cta-title">Ready to Make a Move?</h2>
          <p className="cta-subtitle">Join thousands of verified buyers and sellers today.</p>
          <button className="btn btn-primary btn-large mt-4">
            Get Started Now <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
