import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-bg-primary z-50">
      <motion.div
        className="w-32 h-32 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut", 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-80" />
      </motion.div>
      
      <motion.div
        className="w-64 h-2 bg-bg-tertiary rounded-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      
      <motion.p 
        className="mt-4 text-text-secondary font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {progress < 100 ? 'Entering the nebula...' : 'Ready for liftoff!'}
      </motion.p>
    </div>
  );
};

export default LoadingScreen;