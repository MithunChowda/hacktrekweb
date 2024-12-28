import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function SearchResults() {
  const { state } = useLocation();
  const filteredProducts = state?.filteredProducts || [];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Search Results</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Here are the products matching your search.
          </p>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
              >
                <div className="text-indigo-400 text-4xl mb-4 flex justify-center">{product.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-4">${product.price}</p>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
