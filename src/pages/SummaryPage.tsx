import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/three/ParticleBackground';
import IdeaSummary from '../components/summary/IdeaSummary';
import Header from '../components/common/Header';

const SummaryPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      <ParticleBackground intensity="low" />
      <Header />
      <IdeaSummary />
    </motion.div>
  );
};

export default SummaryPage;