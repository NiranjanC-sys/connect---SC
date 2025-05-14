import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/three/ParticleBackground';
import HeroSection from '../components/landing/HeroSection';
import Header from '../components/common/Header';

const LandingPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      <ParticleBackground intensity="high" />
      <Header />
      <HeroSection />
    </motion.div>
  );
};

export default LandingPage;