import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, UserPlus } from 'lucide-react';

const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState('trending');
  
  const tabs = [
    { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'suggestions', label: 'People', icon: <UserPlus className="w-4 h-4" /> },
  ];
  
  // Mock trending data
  const trendingTopics = [
    { id: 1, tag: '#SpaceTravel', posts: 1243 },
    { id: 2, tag: '#QuantumComputing', posts: 982 },
    { id: 3, tag: '#AI', posts: 756 },
    { id: 4, tag: '#VR', posts: 642 },
    { id: 5, tag: '#CyberSecurity', posts: 521 },
  ];
  
  // Mock user suggestions
  const suggestedUsers = [
    { 
      id: '2', 
      username: 'stellar_dreamer', 
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Exploring the digital universe' 
    },
    { 
      id: '3', 
      username: 'nebula_navigator', 
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'AI researcher and space enthusiast' 
    },
    { 
      id: '4', 
      username: 'quantum_coder', 
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Building the future, one line at a time' 
    },
  ];

  return (
    <div className="h-full border-l border-bg-tertiary bg-bg-secondary p-6 overflow-y-auto">
      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-colors duration-300
              ${activeTab === tab.id 
                ? 'bg-primary text-white' 
                : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'}
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="mt-4">
        {activeTab === 'trending' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Trending Topics</h3>
            
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                className="p-3 rounded-xl hover:bg-bg-tertiary transition-colors duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-primary">{topic.tag}</h4>
                    <p className="text-sm text-text-tertiary">{topic.posts} posts</p>
                  </div>
                  <span className="text-2xl font-bold text-text-tertiary opacity-40">#{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {activeTab === 'suggestions' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Suggested for You</h3>
            
            {suggestedUsers.map((user, index) => (
              <motion.div
                key={user.id}
                className="p-3 rounded-xl hover:bg-bg-tertiary transition-colors duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={user.avatar} 
                    alt={user.username} 
                    className="w-12 h-12 rounded-full border-2 border-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text-primary">{user.username}</h4>
                    <p className="text-sm text-text-tertiary truncate">{user.bio}</p>
                  </div>
                  <button className="shrink-0 btn-ghost px-3 py-1 text-sm rounded-lg border border-primary text-primary hover:bg-primary/10">
                    Follow
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;