import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadLand from './pages/UploadLand';
import BrowseMap from './pages/BrowseMap';
import PropertyDetails from './pages/PropertyDetails';
import AIAssistant from './components/AIAssistant';
import './App.css';

// Simple protected route helper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              {/* Protected feature routes */}
              <Route path="/upload" element={
                <ProtectedRoute>
                  <UploadLand />
                </ProtectedRoute>
              } />
              <Route path="/browse" element={
                <ProtectedRoute>
                  <BrowseMap />
                </ProtectedRoute>
              } />
              <Route path="/property/:id" element={
                <ProtectedRoute>
                  <PropertyDetails />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <AIAssistant />
        </div>
      </BrowserRouter>
    </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
