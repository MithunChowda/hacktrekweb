import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Home, Trophy, HelpCircle, User, Users } from 'lucide-react';

interface NavbarProps {
  isAdmin: boolean;
  products: any[];
}

export function Navbar({ isAdmin, products }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    // XSS Injection Check
    const xssPatterns = [
      /<script.*?>.*?<\/script>/i,  // Script tags
      /javascript:/i,               // Javascript links
      /on\w+=".*?"/i,               // Event handlers (onload, onclick, etc.)
      /<.*?javascript:.*?>/i,       // JavaScript within HTML elements
    ];

    // Check if the query matches any of the XSS patterns
    const isXSS = xssPatterns.some((pattern) => pattern.test(searchQuery));

    if (isXSS) {
      alert("XSS Injection Challenge Completed!");
      sessionStorage.setItem('xssCompleted', 'true'); // Mark XSS challenge as completed
      return;  // Stop further search logic
    }

    // If no XSS, filter products
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pass search query and filtered products to the search results page
    navigate('/search', { state: { searchQuery, filteredProducts } });
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8" />
            <span className="font-bold text-xl">SecureLearn</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" icon={<Home className="w-4 h-4" />} text="Home" />
            <NavLink to="/challenges" icon={<Trophy className="w-4 h-4" />} text="Challenges" />
            <NavLink to="/help" icon={<HelpCircle className="w-4 h-4" />} text="Help" />
            <NavLink to="/profile" icon={<User className="w-4 h-4" />} text="Profile" />
            {isAdmin && <NavLink to="/users" icon={<Users className="w-4 h-4" />} text="Users" />}
          </div>

          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="p-2 rounded bg-white text-black"
            />
            <button type="submit" className="p-2 bg-indigo-600 text-white rounded">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 hover:text-indigo-200 transition-colors duration-200"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
