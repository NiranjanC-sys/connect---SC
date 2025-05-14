import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/three/ParticleBackground';
import AgentDashboard from '../components/dashboard/AgentDashboard';
import Header from '../components/common/Header';

const DashboardPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      <ParticleBackground intensity="medium" />
      <Header />
      <AgentDashboard />
    </motion.div>
  );
};

export default DashboardPage;