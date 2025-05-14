import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6 backdrop-blur-sm bg-neutral-950/50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
        >
          <div className="rounded-full p-2 bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors duration-300">
            <BrainCircuit className="w-6 h-6 text-primary-400" />
          </div>
          <span className="text-xl font-bold text-white">Trae AI</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {location.pathname === '/' ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-300"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <nav className="hidden md:flex items-center space-x-8">
                <NavLink to="/chat" label="Chat" current={location.pathname === '/chat'} />
                <NavLink to="/summary" label="Summary" current={location.pathname === '/summary'} />
                <NavLink to="/dashboard" label="Dashboard" current={location.pathname === '/dashboard'} />
              </nav>
              <Link
                to="/"
                className="px-4 py-2 text-sm text-white bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors duration-300"
              >
                Restart
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  current: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, current }) => {
  return (
    <Link
      to={to}
      className={`relative text-sm font-medium transition-colors duration-300 ${
        current ? 'text-primary-300' : 'text-neutral-300 hover:text-white'
      }`}
    >
      {label}
      {current && (
        <motion.div 
          layoutId="activeNavIndicator"
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-500"
        />
      )}
    </Link>
  );
};

export default Header;