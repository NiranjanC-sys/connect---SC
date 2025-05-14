import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, MessageCircle, Compass, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const MobileNav = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigationItems = [
    { name: 'Home', path: '/', icon: <Home className="w-6 h-6" /> },
    { name: 'Profile', path: `/profile/${user?.id}`, icon: <User className="w-6 h-6" /> },
    { name: 'Messages', path: '/chat', icon: <MessageCircle className="w-6 h-6" /> },
    { name: 'Explore', path: '/explore', icon: <Compass className="w-6 h-6" /> },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="bg-bg-secondary border-t border-bg-tertiary px-6 py-2">
        <div className="flex items-center justify-between">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center p-2 rounded-lg
                ${isActive ? 'text-primary' : 'text-text-tertiary'}
              `}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </NavLink>
          ))}
          
          <button 
            className="flex flex-col items-center p-2 text-text-tertiary"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>
      
      {/* Full Screen Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-bg-primary flex flex-col"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-bg-tertiary">
            <div className="flex items-center space-x-3">
              <img 
                src={user?.avatar} 
                alt={user?.username} 
                className="w-12 h-12 rounded-full border-2 border-primary"
              />
              <div>
                <h3 className="font-bold text-text-primary">{user?.username}</h3>
                <p className="text-sm text-text-tertiary">{user?.email}</p>
              </div>
            </div>
            
            <button 
              className="p-2 rounded-full bg-bg-tertiary"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <nav className="space-y-4">
              <a href="/settings" className="block px-4 py-3 rounded-xl hover:bg-bg-secondary transition-colors">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-text-primary">Settings</span>
                </div>
              </a>
              
              <a href="/logout" className="block px-4 py-3 rounded-xl hover:bg-bg-secondary transition-colors">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium text-text-primary">Log Out</span>
                </div>
              </a>
            </nav>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default MobileNav;