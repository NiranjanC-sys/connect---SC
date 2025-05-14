import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/three/ParticleBackground';
import ChatInterface from '../components/chat/ChatInterface';
import Header from '../components/common/Header';

const ChatPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      <ParticleBackground intensity="low" />
      <Header />
      <ChatInterface />
    </motion.div>
  );
};

export default ChatPage;