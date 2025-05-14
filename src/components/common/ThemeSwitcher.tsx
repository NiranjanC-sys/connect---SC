import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      className={`
        relative p-2 rounded-full overflow-hidden 
        ${theme === 'dark' ? 'bg-slate-700' : 'bg-amber-100'}
        transition-colors duration-300
      `}
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 40 : 0,
        }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-indigo-200" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeSwitcher;