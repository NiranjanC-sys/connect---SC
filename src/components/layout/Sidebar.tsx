import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, MessageCircle, Settings, Compass, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const navigationItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Profile', path: `/profile/${user?.id}`, icon: <User className="w-5 h-5" /> },
    { name: 'Messages', path: '/chat', icon: <MessageCircle className="w-5 h-5" /> },
    { name: 'Explore', path: '/explore', icon: <Compass className="w-5 h-5" /> },
    { name: 'Notifications', path: '/notifications', icon: <Bell className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="h-full border-r border-bg-tertiary bg-bg-secondary py-6 flex flex-col">
      {/* Logo */}
      <div className="px-6 mb-8">
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-text-primary font-bold text-xl">Connect</span>
        </motion.div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300
                  ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'}
                `}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  animate={{
                    scale: hoveredItem === item.name ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User Profile */}
      <div className="px-3 mt-4">
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-bg-tertiary transition-colors duration-300">
          <img 
            src={user?.avatar} 
            alt={user?.username} 
            className="w-10 h-10 rounded-full border-2 border-primary"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-text-primary truncate">{user?.username}</p>
            <p className="text-sm text-text-tertiary truncate">{user?.email}</p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={logout}
          className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;