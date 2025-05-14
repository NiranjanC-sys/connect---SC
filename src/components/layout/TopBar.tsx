import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, X } from 'lucide-react';
import ThemeSwitcher from '../common/ThemeSwitcher';

const TopBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-md border-b border-bg-tertiary py-3 px-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <motion.div 
            className={`
              flex items-center bg-bg-secondary rounded-xl px-3 py-2 
              ${isSearchFocused ? 'ring-2 ring-primary' : 'ring-0'}
            `}
            animate={{
              width: isSearchFocused ? '100%' : '100%',
            }}
            transition={{ duration: 0.3 }}
          >
            <Search className="w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search for people, posts, or topics..."
              className="w-full ml-2 bg-transparent border-none focus:outline-none text-text-primary placeholder:text-text-tertiary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery && (
              <button 
                onClick={handleClearSearch}
                className="p-1 rounded-full hover:bg-bg-tertiary text-text-tertiary"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 ml-4">
          <motion.button
            className="relative p-2 rounded-full bg-bg-secondary hover:bg-bg-tertiary transition-colors duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-text-secondary" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-bg-primary"></span>
          </motion.button>
          
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default TopBar;