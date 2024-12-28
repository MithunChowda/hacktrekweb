import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaLaptop,
  FaKeyboard,
  FaMouse,
  FaTv,
  FaHeadphones,
  FaRulerCombined,
  FaVrCardboard,
  FaChair,
  FaCamera,
  FaGamepad,
  FaHdd,
  FaDesktop,
  FaMicrochip,
} from 'react-icons/fa';

export function Hero() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);

  const products = [
    { id: 1, name: 'Gaming Laptop', price: 1500, icon: <FaLaptop /> },
    { id: 2, name: 'Mechanical Keyboard', price: 120, icon: <FaKeyboard /> },
    { id: 3, name: 'Gaming Mouse', price: 80, icon: <FaMouse /> },
    { id: 4, name: '4K Monitor', price: 400, icon: <FaTv /> },
    { id: 5, name: 'Gaming Headset', price: 90, icon: <FaHeadphones /> },
    { id: 6, name: 'RGB Mousepad', price: 50, icon: <FaRulerCombined /> },
    { id: 7, name: 'VR Headset', price: 300, icon: <FaVrCardboard /> },
    { id: 8, name: 'Gaming Chair', price: 250, icon: <FaChair /> },
    { id: 9, name: 'Streaming Webcam', price: 150, icon: <FaCamera /> },
    { id: 10, name: 'Game Controller', price: 60, icon: <FaGamepad /> },
    { id: 11, name: 'External SSD', price: 180, icon: <FaHdd /> },
    { id: 12, name: 'Gaming PC Case', price: 120, icon: <FaDesktop /> },
    { id: 13, name: 'Graphics Card', price: 700, icon: <FaMicrochip /> },
    { id: 14, name: 'Elgato Capture Card', price: 200, icon: <FaGamepad /> },
    { id: 15, name: 'Customizable Gamepad', price: 130, icon: <FaGamepad /> },
  ];

  const handleCartUpdate = async (product: any) => {
    try {
      const existingProductIndex = cart.findIndex((item) => item.name === product.name);
      let updatedCart = [...cart];
      let quantity = 1;

      if (existingProductIndex !== -1) {
        // Update existing product's quantity
        quantity = updatedCart[existingProductIndex].quantity + 1;
        updatedCart[existingProductIndex].quantity = quantity;
      } else {
        // Add a new product to the cart
        updatedCart.push({ ...product, quantity });
      }

      setCart(updatedCart);

      // Send request to backend API
      const response = await fetch('http://localhost/shopping_cart_api/manage_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: product.name,
          product_price: product.price,
          quantity,
        }),
      });

      const data = await response.json();
      if (data.status !== 'success') {
        alert(data.message || 'Failed to update the cart.');
      }
    } catch (error) {
      console.error('Error updating the cart:', error);
      alert('An error occurred while updating the cart.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Your Ultimate Gaming Store</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Explore the best gaming products and accessories at unbeatable prices.
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigate('/cart')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              View Cart
            </button>
            <button
              onClick={() => navigate('/products')}
              className="border border-white hover:bg-white hover:text-indigo-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Shop Now
            </button>
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="text-indigo-400 text-4xl mb-4 flex justify-center">{product.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-300 mb-4">${product.price}</p>
              <button
                onClick={() => handleCartUpdate(product)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
