import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, ShieldCheck, Globe } from 'lucide-react';
import './Header.css';

export default function Header() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <ShieldCheck className="logo-icon" size={28} />
          <span className="logo-text">LandDirect</span>
        </Link>
        
        <nav className="desktop-nav">
          <Link to="/browse" className="nav-link">{t('buyLand')}</Link>
          <Link to="/upload" className="nav-link">{t('sellLand')}</Link>
          <Link to="/how-it-works" className="nav-link">{t('howItWorks')}</Link>
        </nav>
        
        <div className="header-actions" style={{ gap: '1rem' }}>
          <div className="lang-switcher" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Globe size={18} className="text-muted" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as 'en' | 'te' | 'hi')}
              style={{ border: 'none', background: 'transparent', outline: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontWeight: 600 }}
            >
              <option value="en">EN</option>
              <option value="te">తెలుగు</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
          <Link to="/login" className="btn btn-outline login-btn">
            <User size={18} />
            <span>{t('login')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
