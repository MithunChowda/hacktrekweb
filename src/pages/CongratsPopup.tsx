import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // For animating the entrance and effects

const CongratsPopup = ({ onClose }: { onClose: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Set a timer to close the popup after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Callback to notify the parent component to close the popup
    }, 5000); // Close after 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return (
    isVisible && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Congratulations message */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative bg-indigo-600 text-white p-8 rounded-lg shadow-xl z-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
          <p className="text-lg">You've successfully bypassed Challenge 1!</p>
          
          {/* Paper blast animation */}
          <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden z-20">
            <div className="paper-blast"></div>
          </div>
        </motion.div>
      </div>
    )
  );
};

export default CongratsPopup;
