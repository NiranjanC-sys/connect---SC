import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, AtSign, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeSwitcher from '../components/common/ThemeSwitcher';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(username, email, password);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Theme Toggle in top right */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitcher />
      </div>
      
      {/* Left Panel - Animated Graphic */}
      <motion.div 
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary via-secondary to-accent items-center justify-center relative overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white text-center p-12 z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-6">Join Nebula Social</h1>
            <p className="text-xl opacity-80 mb-8">Create your profile and start connecting with friends in our futuristic social space.</p>
          </motion.div>
        </div>
        
        {/* Animated orbs in background */}
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-white opacity-10"
          animate={{ 
            x: [50, -50, 50],
            y: [25, -25, 25],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute w-32 h-32 rounded-full bg-accent opacity-20"
          animate={{ 
            x: [-30, 30, -30],
            y: [-50, 50, -50],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>
      
      {/* Right Panel - Registration Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-text-primary font-bold text-2xl">Nebula</span>
            </div>
            
            <h2 className="text-3xl font-bold text-text-primary mb-2">Create an account</h2>
            <p className="text-text-secondary mb-8">Fill in your details to join our community</p>
          
            {error && (
              <motion.div 
                className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-text-tertiary" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input pl-10"
                    placeholder="cosmic_voyager"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AtSign className="w-5 h-5 text-text-tertiary" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-10"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-text-tertiary" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pl-10 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-text-tertiary" />
                    ) : (
                      <Eye className="w-5 h-5 text-text-tertiary" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-text-tertiary" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-bg-tertiary rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-text-secondary">
                  I agree to the <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full btn btn-primary flex items-center justify-center
                  ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>
            
            <p className="mt-8 text-center text-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                Log in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;