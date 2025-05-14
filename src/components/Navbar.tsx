import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4">
        <div className="py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Stethoscope className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Pokidoc
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-green-600 transition-colors">Features</a>
            <a href="#about" className="hover:text-green-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-green-600 transition-colors">Contact</a>
            <motion.a
              href="#newsletter"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold"
            >
              Join Waitlist
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  );
};