import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Book, MessageCircle, Video, MessageSquare } from 'lucide-react';

export function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white"
        >
          <h1 className="text-4xl font-bold mb-8">Help Center</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Book className="w-6 h-6 text-indigo-400" />
                <h2 className="text-xl font-semibold ml-2">Documentation</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Comprehensive guides and tutorials to help you understand web security concepts.
              </p>
              <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                Browse Documentation →
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Video className="w-6 h-6 text-indigo-400" />
                <h2 className="text-xl font-semibold ml-2">Video Tutorials</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Watch step-by-step video tutorials explaining various security concepts.
              </p>
              <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                Watch Tutorials →
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-indigo-400" />
                <h2 className="text-xl font-semibold ml-2">Community Support</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Join our community forum to get help from other security enthusiasts.
              </p>
              <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                Join Community →
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-6 h-6 text-indigo-400" />
                <h2 className="text-xl font-semibold ml-2">FAQs</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Find answers to commonly asked questions about our platform.
              </p>
              <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                View FAQs →
              </button>
            </div>
          </div>

          {/* Chatbot Section */}
          <div className="mt-12 bg-gray-800 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-semibold ml-2">Chat with our Support Bot</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Need help? Chat with our support bot for immediate assistance.
            </p>
            <a
              href="http://127.0.0.1:5500/chatbot-webpage/index.html" // Redirect link to the chatbot
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Start Chat
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
