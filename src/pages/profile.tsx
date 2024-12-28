import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react'; // Only keep Trophy icon for Challenges Completed
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

export function ProfilePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<number>(0);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const completedChallengesCount = sessionStorage.getItem('completedChallengesCount');
    setCompletedChallenges(completedChallengesCount ? Number(completedChallengesCount) : 0);

    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    sessionStorage.removeItem('completedChallengesCount');
    window.location.href = "http://localhost:5173/"; // Redirect to the homepage
  };

  const handleAdminClick = () => {
    if (userEmail === 'admin@gmail.com') {
      navigate('/admin'); // Navigate to /admin if logged-in user is admin
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white"
        >
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold">
                  {userEmail || 'Guest User'}
                  {userEmail === 'admin@gmail.com' && (
                    <button
                      onClick={handleAdminClick}
                      className="text-blue-400 ml-4 underline"
                    >
                      Go to Admin Page
                    </button>
                  )}
                </h1>
                <p className="text-gray-400">Security Enthusiast</p>
              </div>
            </div>

            {/* Challenges Completed Stats */}
            <div className="bg-gray-700 rounded-lg p-4 text-center mb-8">
              <div className="flex justify-center mb-2 text-indigo-400">
                <Trophy />
              </div>
              <div className="text-2xl font-bold mb-1">{completedChallenges}</div>
              <div className="text-sm text-gray-400">Challenges Completed</div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              Log Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
