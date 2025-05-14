import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, LogIn, UserPlus } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading, setCurrentScreen } = useAppStore();
  
  const handleStartClick = () => {
    setLoading(true, 'Initializing AI agents...');
    
    // Simulate loading for demo purposes
    setTimeout(() => {
      setLoading(false);
      setCurrentScreen('chat');
      navigate('/chat');
    }, 2000);
  };
  
  return (
    <div className="relative min-h-screen">
      {/* Main content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-2 inline-flex items-center bg-neutral-900/80 border border-neutral-800 rounded-full px-4 py-2"
        >
          <Sparkles className="w-4 h-4 mr-2 text-accent-500" />
          <span className="text-sm font-medium">AI-Powered Startup Validation</span>
        </motion.div>
        
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl glow-text bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400"
        >
          Validate Your Startup Idea with AI Agents
        </motion.h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl"
        >
          Get comprehensive validation from multiple AI agents that analyze your idea from different angles: market fit, competition, risks, and investor appeal.
        </motion.p>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            onClick={handleStartClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="neumorphic py-4 px-8 rounded-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex items-center justify-center">
              <Zap className="w-5 h-5 mr-2 text-primary-400" />
              <span className="text-xl font-semibold text-white">Start Now</span>
            </div>
            
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(66, 51, 255, 0)",
                  "0 0 15px 3px rgba(66, 51, 255, 0.4)",
                  "0 0 0 0 rgba(66, 51, 255, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="py-4 px-6 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 transition-colors duration-300 flex items-center gap-2"
            >
              <LogIn className="w-5 h-5 text-primary-400" />
              <span className="font-medium">Log In</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="py-4 px-6 rounded-xl bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 transition-colors duration-300 flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Sign Up</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-1 h-12 relative">
          <motion.div
            className="absolute top-0 w-full bg-primary-500/50 rounded-full"
            animate={{
              height: [0, 12, 0],
              y: [0, 24, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <span className="text-xs text-neutral-400 mt-2">Scroll to learn more</span>
      </motion.div>

      {/* Features section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-panel p-6 hover:bg-neutral-900/60 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

const features = [
  {
    title: "Multi-Agent Analysis",
    description: "Get insights from specialized AI agents analyzing different aspects of your startup idea.",
    icon: <Sparkles className="w-6 h-6 text-primary-400" />
  },
  {
    title: "Real-time Validation",
    description: "Receive instant feedback and validation scores as you describe your startup concept.",
    icon: <Zap className="w-6 h-6 text-accent-400" />
  },
  {
    title: "Comprehensive Reports",
    description: "Generate detailed reports with actionable insights and recommendations for your startup.",
    icon: <LogIn className="w-6 h-6 text-secondary-400" />
  }
];

export default HeroSection;