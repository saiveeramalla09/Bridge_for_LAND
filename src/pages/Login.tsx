import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from '../context/AuthContext';
import { ShieldCheck, Mail, Smartphone, ArrowRight } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState<'input' | 'otp' | 'password'>('input');
  const [role, setRole] = useState<UserRole>('buyer');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('password');
  };

  const handleFinishLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(inputValue, role);
    navigate('/dashboard');
  };

  return (
    <div className="login-container bg-section">
      <div className="login-card card animate-fade-in">
        <div className="login-header">
          <ShieldCheck size={48} className="text-primary mx-auto mb-2" />
          <h2 className="section-title text-center">Welcome Back</h2>
          <p className="text-muted text-center mb-4">Secure login to your real estate portal</p>
        </div>

        {step === 'input' && (
          <form onSubmit={handleSendOtp} className="login-form">
            <div className="tabs mb-4">
              <button 
                type="button" 
                className={`tab-btn ${method === 'phone' ? 'active' : ''}`}
                onClick={() => setMethod('phone')}
              >
                <Smartphone size={18} /> Mobile
              </button>
              <button 
                type="button" 
                className={`tab-btn ${method === 'email' ? 'active' : ''}`}
                onClick={() => setMethod('email')}
              >
                <Mail size={18} /> Email
              </button>
            </div>

            <div className="input-group mb-3">
              <label className="input-label">{method === 'phone' ? 'Mobile Number' : 'Email Address'}</label>
              <input 
                type={method === 'phone' ? 'tel' : 'email'} 
                className="input-field large" 
                placeholder={method === 'phone' ? '+91 XXXXX XXXXX' : 'you@example.com'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            </div>

            <div className="input-group mb-4">
              <label className="input-label">I want to...</label>
              <select className="input-field" value={role ?? 'buyer'} onChange={(e) => setRole(e.target.value as UserRole)}>
                <option value="buyer">Buy Land</option>
                <option value="seller">Sell Land</option>
                <option value="admin">Admin Panel</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-large w-full">
              Get OTP <ArrowRight size={20} />
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <p className="text-center mb-3">OTP sent to <strong>{inputValue}</strong></p>
            <div className="input-group mb-4">
              <label className="input-label">Enter 6-digit OTP</label>
              <input type="text" className="input-field large text-center tracking-widest" placeholder="• • • • • •" required />
            </div>
            <button type="submit" className="btn btn-primary btn-large w-full">Verify OTP</button>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handleFinishLogin} className="login-form">
            <p className="text-center mb-3">Setup your permanent password</p>
            <div className="input-group mb-4">
              <label className="input-label">New Password</label>
              <input type="password" className="input-field large" required />
            </div>
            <button type="submit" className="btn btn-success btn-large w-full">Complete Setup</button>
          </form>
        )}
      </div>
    </div>
  );
}
