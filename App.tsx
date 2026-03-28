import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import Dashboard from './Dashboard';
import UploadLand from './UploadLand';
import BrowseMap from './BrowseMap';
import PropertyDetails from './PropertyDetails';
import AIAssistant from './AIAssistant';
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
