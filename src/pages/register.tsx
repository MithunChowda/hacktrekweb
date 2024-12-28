import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook
import { motion } from 'framer-motion'; // Importing motion for animation

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !securityQuestion || !securityAnswer) {
      alert('Please fill in all fields');
      return;
    }

    // Gmail format validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid Gmail address (e.g., example@gmail.com)');
      return;
    }

    try {
      const response = await fetch('http://localhost/react-login/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          security_question: securityQuestion,
          security_answer: securityAnswer
        }), // Send email, password, question and answer to backend
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Registration successful!');
        navigate('/'); // Redirect to login after successful registration
      } else {
        alert(data.message); // Display any error message from the server
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleRegister} className="space-y-6">
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
          <div>
            <label htmlFor="security_question" className="block text-gray-400 mb-2">
              Security Question
            </label>
            <input
              type="text"
              id="security_question"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring focus:ring-indigo-500 outline-none"
              placeholder="Enter your security question"
              required
            />
          </div>
          <div>
            <label htmlFor="security_answer" className="block text-gray-400 mb-2">
              Security Answer
            </label>
            <input
              type="text"
              id="security_answer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring focus:ring-indigo-500 outline-none"
              placeholder="Enter your answer"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Register
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')} // Use navigate for redirecting to login
            className="text-indigo-400 hover:underline"
          >
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
