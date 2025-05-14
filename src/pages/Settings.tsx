import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Bell, Lock, Shield, Moon, Globe, 
  Volume2, Monitor, LifeBuoy, LogOut 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

type SettingsSection = 'account' | 'appearance' | 'notifications' | 'privacy' | 'sound' | 'accessibility' | 'help';

const Settings = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  
  const settingsSections = [
    { id: 'account', label: 'Account', icon: <User className="w-5 h-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Moon className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'sound', label: 'Sound', icon: <Volume2 className="w-5 h-5" /> },
    { id: 'accessibility', label: 'Accessibility', icon: <Monitor className="w-5 h-5" /> },
    { id: 'help', label: 'Help & Support', icon: <LifeBuoy className="w-5 h-5" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {/* Settings Sidebar */}
      <div className="md:col-span-1">
        <div className="bg-bg-secondary rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-bg-tertiary">
            <h2 className="text-xl font-bold text-text-primary">Settings</h2>
          </div>
          
          <nav className="p-2">
            <ul className="space-y-1">
              {settingsSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id as SettingsSection)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                      ${activeSection === section.id 
                        ? 'bg-primary text-white' 
                        : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'}
                    `}
                  >
                    {section.icon}
                    <span>{section.label}</span>
                  </button>
                </li>
              ))}
              
              <li className="mt-4 pt-4 border-t border-bg-tertiary">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-error hover:bg-error/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Settings Content */}
      <div className="md:col-span-3">
        <div className="bg-bg-secondary rounded-xl shadow-sm overflow-hidden">
          {/* Account Settings */}
          {activeSection === 'account' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <h2 className="text-xl font-bold text-text-primary mb-6">Account Settings</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-text-primary mb-4">Profile Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Profile Picture
                    </label>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={user?.avatar} 
                        alt={user?.username} 
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <button className="btn-ghost px-4 py-2 text-sm">
                        Change Photo
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      defaultValue={user?.username}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={user?.email}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-text-secondary mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      defaultValue="Explorer of digital universes. Building the future of social connection."
                      className="input resize-none"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-text-primary mb-4">Account Management</h3>
                
                <div className="space-y-4">
                  <button className="btn-ghost w-full text-left px-4 py-3 flex justify-between items-center">
                    <span>Change Password</span>
                    <svg className="w-5 h-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button className="btn-ghost w-full text-left px-4 py-3 flex justify-between items-center">
                    <span>Connected Accounts</span>
                    <svg className="w-5 h-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button className="btn-ghost w-full text-left px-4 py-3 flex justify-between items-center text-error">
                    <span>Delete Account</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </motion.div>
          )}
          
          {/* Appearance Settings */}
          {activeSection === 'appearance' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <h2 className="text-xl font-bold text-text-primary mb-6">Appearance Settings</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-text-primary mb-4">Theme</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center space-x-3
                      ${theme === 'light' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-bg-tertiary hover:border-primary/50'}
                    `}
                    onClick={() => theme !== 'light' && toggleTheme()}
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">Light Mode</h4>
                      <p className="text-xs text-text-tertiary">Bright and clean interface</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center space-x-3
                      ${theme === 'dark' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-bg-tertiary hover:border-primary/50'}
                    `}
                    onClick={() => theme !== 'dark' && toggleTheme()}
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">Dark Mode</h4>
                      <p className="text-xs text-text-tertiary">Easier on the eyes at night</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-text-primary mb-4">3D Effects</h3>
                
                <div>
                  <label className="flex items-center space-x-3 pb-2">
                    <input type="checkbox" className="h-5 w-5 text-primary rounded" defaultChecked />
                    <span className="text-text-primary">Enable 3D background effects</span>
                  </label>
                  <p className="text-sm text-text-tertiary ml-8 mb-4">
                    Adds subtle 3D particle effects to the background (may affect performance on older devices)
                  </p>
                  
                  <label className="flex items-center space-x-3 pb-2">
                    <input type="checkbox" className="h-5 w-5 text-primary rounded" defaultChecked />
                    <span className="text-text-primary">Enable 3D card hover effects</span>
                  </label>
                  <p className="text-sm text-text-tertiary ml-8 mb-4">
                    Adds depth and tilt effects when hovering over posts and cards
                  </p>
                  
                  <label className="flex items-center space-x-3 pb-2">
                    <input type="checkbox" className="h-5 w-5 text-primary rounded" defaultChecked />
                    <span className="text-text-primary">Enable transition animations</span>
                  </label>
                  <p className="text-sm text-text-tertiary ml-8">
                    Smooth transitions between pages and UI elements
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </motion.div>
          )}
          
          {/* Other Settings Sections */}
          {activeSection !== 'account' && activeSection !== 'appearance' && (
            <div className="p-6 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  {settingsSections.find(s => s.id === activeSection)?.label} Settings
                </h3>
                <p className="text-text-tertiary">
                  This settings section is under construction. Check back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;