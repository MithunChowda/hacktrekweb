import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook
import { motion } from 'framer-motion';

const Login = ({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sending a POST request to the PHP backend
      const response = await fetch('http://localhost/react-login/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Sending email and password as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to connect to the server.');
      }

      const data = await response.json(); // Parse the JSON response from the backend

      if (data.status === 'success') {
        alert(data.message); // Display success message from the server
        setIsAuthenticated(true); // Update authentication state

        // Storing user email and admin status in localStorage or state
        localStorage.setItem('userEmail', data.userEmail);
        localStorage.setItem('isAdmin', JSON.stringify(data.isAdmin));

        navigate('/home'); // Redirect to home page
      } else {
        alert(data.message); // Display error message from the server
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-8 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          Log in to access your account.
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring focus:ring-indigo-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring focus:ring-indigo-500 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Log In
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')} // Navigate to the Register page
            className="text-indigo-400 hover:underline"
          >
            Sign up
          </button>
        </p>
        {/* Forgot Password Link */}
        <p className="text-gray-400 text-center mt-2">
          Forgot your password?{' '}
          <button
            onClick={() => navigate('/forgot-password')} // Navigate to Forgot Password page
            className="text-indigo-400 hover:underline"
          >
            Reset it here
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
