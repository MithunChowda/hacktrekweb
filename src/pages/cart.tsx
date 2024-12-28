import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, CreditCard } from 'lucide-react';
import axios from 'axios';

export function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost/shopping_cart_api/get_cart.php');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product_price * item.quantity, 0);
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await axios.post('http://localhost/shopping_cart_api/remove_from_cart.php', { id });
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-800 rounded-lg p-6 text-white"
              >
                <div className="flex items-center mb-4">
                  {<Package className="w-6 h-6" />}
                  <span className="ml-2 text-sm font-medium text-indigo-400">
                    ${item.product_price} each
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.product_name}</h3>
                <p className="text-gray-400 mb-4">{item.product_description}</p>
                <p className="text-gray-400 mb-4">Quantity: {item.quantity}</p>
                <button
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors duration-200"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove from Cart
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white">Order Summary</h2>
            <div className="mt-4 text-white">
              <div className="flex justify-between mb-2">
                <span>Items Total</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold mb-4">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors duration-200"
              onClick={handleCheckout}
            >
              <CreditCard className="inline mr-2" />
              Checkout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
