import React from 'react';
import { motion } from 'framer-motion';
import AIOrb from '../three/AIOrb';

interface TransitionOverlayProps {
  message?: string;
}

const TransitionOverlay: React.FC<TransitionOverlayProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950"
    >
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <AIOrb isAnimating={true} className="w-40 h-40" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 20px 10px rgba(66, 51, 255, 0.3)",
              "0 0 30px 15px rgba(66, 51, 255, 0.6)",
              "0 0 20px 10px rgba(66, 51, 255, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <motion.p
        className="mt-8 text-xl font-medium text-primary-300"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {message}
      </motion.p>
      
      <motion.div
        className="mt-10 w-48 h-1 bg-neutral-800 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TransitionOverlay;