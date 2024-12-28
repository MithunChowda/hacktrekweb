import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/ui/navbar';
import { Hero } from './components/home/hero';
import { ChallengesPage } from './pages/challenges';
import { HelpPage } from './pages/help';
import { ProfilePage } from './pages/profile';
import Login from './pages/login';
import Register from './pages/register';
import UsersPage from './pages/users';
import { CartPage } from './pages/cart'; // Import CartPage
import { SearchResults } from './pages/searchResults'; // Import the SearchResults page
import ForgotPassword from './pages/forgotPassword'; // Correct import for ForgotPassword

function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<any[]>([]); // Store products list

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail === 'admin@gmail.com') {
      setIsAdmin(true);
    }
  }, [isAuthenticated]);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('userEmail', email);
    if (email === 'admin@gmail.com') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Fetch your product list or mock data here
    setProducts([
      { id: 1, name: 'Gaming Laptop', price: 1500 },
      { id: 2, name: 'Mechanical Keyboard', price: 120 },
      { id: 3, name: 'Gaming Mouse', price: 80 },
      { id: 4, name: '4K Monitor', price: 400 },
      { id: 5, name: 'Gaming Headset', price: 90 },
      { id: 6, name: 'RGB Mousepad', price: 50 },
      { id: 7, name: 'VR Headset', price: 300 },
      { id: 8, name: 'Gaming Chair', price: 250 },
      { id: 9, name: 'Streaming Webcam', price: 150 },
      { id: 10, name: 'Game Controller', price: 60 },
      { id: 11, name: 'External SSD', price: 180 },
      { id: 12, name: 'Gaming PC Case', price: 120 },
      { id: 13, name: 'Graphics Card', price: 700 },
      { id: 14, name: 'Elgato Capture Card', price: 200 },
      { id: 15, name: 'Customizable Gamepad', price: 130 },
    ]);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar isAdmin={isAdmin} products={products} />}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login setIsAuthenticated={setIsAuthenticated} handleLogin={handleLogin} />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Corrected */}
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" replace />} />
          <Route path="/challenges" element={isAuthenticated ? <ChallengesPage /> : <Navigate to="/" replace />} />
          <Route path="/help" element={isAuthenticated ? <HelpPage /> : <Navigate to="/" replace />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" replace />} />
          <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/" replace />} />
          {isAdmin && <Route path="/users" element={<UsersPage />} />}
          
          {/* Search results route */}
          <Route path="/search" element={<SearchResults />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
