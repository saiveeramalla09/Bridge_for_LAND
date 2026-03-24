import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, PlusCircle, Map, AlertCircle, FileCheck } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mt-4 mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 className="section-title">Dashboard</h1>
          <p className="text-muted">Welcome back, <strong>{user.name}</strong> ({user.role})</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline">
          <LogOut size={18} /> Logout
        </button>
      </div>

      {user.role === 'seller' && (
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card text-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/upload')}>
            <PlusCircle size={48} className="text-success mx-auto mb-3" style={{ margin: '0 auto 1rem' }} />
            <h3>Upload New Land</h3>
            <p className="text-muted mt-2">Add a new property to the marketplace</p>
          </div>
          <div className="card">
            <h3 className="mb-3">My Listings</h3>
            <div className="listing-item" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Survey #45/A</strong>
                <span className="verify-badge" style={{ color: 'var(--color-warning)', fontSize: '0.85rem' }}>⏳ Reviewing</span>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>200 Gajam • ₹25,000/gajam</p>
            </div>
          </div>
        </div>
      )}

      {user.role === 'buyer' && (
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card text-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/browse')}>
            <Map size={48} className="text-primary mx-auto mb-3" style={{ margin: '0 auto 1rem' }} />
            <h3>Browse Map</h3>
            <p className="text-muted mt-2">Find your perfect plot on the interactive map</p>
          </div>
          <div className="card">
            <h3 className="mb-3">Saved Properties</h3>
            <p className="text-muted text-center py-4">No saved properties yet.</p>
          </div>
        </div>
      )}

      {user.role === 'admin' && (
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card bg-warning-light">
            <AlertCircle size={32} className="text-warning mb-2" />
            <h3>3 Flagged Listings</h3>
            <button className="btn btn-primary mt-3 w-full">Review Now</button>
          </div>
          <div className="card bg-success-light">
            <FileCheck size={32} className="text-success mb-2" />
            <h3>12 Pending Verifications</h3>
            <button className="btn btn-primary mt-3 w-full">Verify Documents</button>
          </div>
        </div>
      )}
    </div>
  );
}
