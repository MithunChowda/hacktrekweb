import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Brain, CheckCircle, Key } from 'lucide-react';

export function ChallengesPage() {
  const [isAdmin, setIsAdmin] = useState<boolean>(sessionStorage.getItem('adminChallengeCompleted') === 'true');
  const [mockingCompleted, setMockingCompleted] = useState<boolean>(sessionStorage.getItem('mockingCompleted') === 'true');
  const [xssCompleted, setXssCompleted] = useState<boolean>(sessionStorage.getItem('xssCompleted') === 'true');
  const [mockingInput, setMockingInput] = useState<string>("");
  const [passwordResetCompleted, setPasswordResetCompleted] = useState<boolean>(sessionStorage.getItem('passwordResetCompleted') === 'true');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail === 'admin@gmail.com') {
      setIsAdmin(true);
      sessionStorage.setItem('adminChallengeCompleted', 'true');
    }

    // Check if XSS challenge is completed from session storage
    const xssStatus = sessionStorage.getItem('xssCompleted');
    if (xssStatus === 'true') {
      setXssCompleted(true);
    }

    // Check if Password Reset challenge is completed from session storage
    const passwordResetStatus = sessionStorage.getItem('passwordResetCompleted');
    if (passwordResetStatus === 'true') {
      setPasswordResetCompleted(true);
    }
  }, []);

  const handleMockingInput = () => {
    if (mockingInput.trim() === "WINNER2024") {
      setMockingCompleted(true);
      sessionStorage.setItem('mockingCompleted', 'true');
      setMockingInput("");
      updateCompletedChallenges();
    } else {
      alert("Incorrect code. Please try again!");
    }
  };

  const updateCompletedChallenges = () => {
    const completedCount = challenges.filter(challenge => challenge.completed).length + (mockingCompleted ? 1 : 0);
    sessionStorage.setItem('completedChallengesCount', completedCount.toString());
  };

  const challenges = [
    { id: 1, title: 'SQL Injection Basics', description: 'Learn how to identify and exploit basic SQL injection vulnerabilities', difficulty: 'Beginner', icon: <Shield className="w-6 h-6" />, completed: false },
    { id: 2, title: 'XSS Attack Vectors', description: 'perform an xxs attck in the place where text can be enterted in this website ;)', difficulty: 'Intermediate', icon: <Target className="w-6 h-6" />, completed: xssCompleted }, 
    { id: 3, title: 'Authentication Bypass', description: 'Explore common authentication vulnerabilities', difficulty: 'Advanced', icon: <Brain className="w-6 h-6" />, completed: false },
    { id: 4, title: 'ADMIN LOGIN', description: 'Login using the admin credentials', difficulty: 'Advanced', icon: <CheckCircle className="w-6 h-6" />, completed: isAdmin },
    { id: 5, title: 'Reset Existing Guest Password', description: 'Big fan of MJ, that’s why he’s after my name.\nauthor:MITHUN', difficulty: 'Advanced', icon: <Key className="w-6 h-6" />, completed: passwordResetCompleted }
  ];

  const completedChallengesCount = challenges.filter(challenge => challenge.completed).length + (mockingCompleted ? 1 : 0);

  useEffect(() => {
    updateCompletedChallenges();
  }, [challenges, mockingCompleted]);

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Security Challenges</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                whileHover={{ scale: 1.03 }}
                className={`bg-gray-800 rounded-lg p-6 text-white ${challenge.completed ? 'bg-green-800' : ''}`}
              >
                <div className="flex items-center mb-4">
                  {challenge.icon}
                  <span className={`ml-2 text-sm font-medium ${challenge.completed ? 'text-green-400' : 'text-indigo-400'}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                <p className="text-gray-400 mb-4">{challenge.description}</p>
                <button
                  className={`w-full ${challenge.completed ? 'bg-green-600' : 'bg-indigo-600'} hover:bg-indigo-700 text-white py-2 rounded-md transition-colors duration-200`}
                  disabled={challenge.completed}
                >
                  {challenge.completed ? 'Completed' : 'Incomplete'}
                </button>
              </motion.div>
            ))}

            {/* MOCKING Challenge */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className={`bg-gray-800 rounded-lg p-6 text-white ${mockingCompleted ? 'bg-green-800' : ''}`}
            >
              <div className="flex items-center mb-4">
                <span className={`ml-2 text-sm font-medium ${mockingCompleted ? 'text-green-400' : 'text-indigo-400'}`}>
                  Special Challenge
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Mocking Code</h3>
              <input
                type="text"
                value={mockingInput}
                onChange={(e) => setMockingInput(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded mb-4 w-full"
                placeholder="Enter Code"
              />
              <button
                onClick={handleMockingInput}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition-colors duration-200"
              >
                Submit Code
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
