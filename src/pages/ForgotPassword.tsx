import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost/react-login/forgot-password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to the server.');
      }

      const data = await response.json();

      if (data.status === 'success') {
        setSecurityQuestion(data.security_question);
        setStep(2);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during reset request:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost/react-login/reset-password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
          securityAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to the server.');
      }

      const data = await response.json();

      if (data.status === 'success') {
        if (email === 'mithunchowda@gmail.com') {
          sessionStorage.setItem('passwordResetStatus', 'true');
        }
        alert(data.message);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during password reset request:', error);
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
          Forgot Your Password?
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          Enter your email address, answer your security question, and choose a new password.
        </p>

        {step === 1 ? (
          <form onSubmit={handleResetRequest} className="space-y-6">
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

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Send Security Question
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label htmlFor="security-question" className="block text-gray-400 mb-2">
                Security Question
              </label>
              <input
                type="text"
                id="security-question"
                value={securityQuestion}
                readOnly
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="security-answer" className="block text-gray-400 mb-2">
                Answer
              </label>
              <input
                type="text"
                id="security-answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                placeholder="Enter your answer"
                required
              />
            </div>

            <div>
              <label htmlFor="new-password" className="block text-gray-400 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                placeholder="Enter your new password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-gray-400 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                placeholder="Confirm your new password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Reset Password
            </button>
          </form>
        )}

        <p className="text-gray-400 text-center mt-4">
          Remembered your password?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-400 hover:underline"
          >
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
