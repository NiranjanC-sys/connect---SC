import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Edit, Calendar, MapPin, Link as LinkIcon, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  stats: {
    posts: number;
    following: number;
    followers: number;
  };
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  
  // Check if viewing own profile
  const isOwnProfile = user?.id === id;
  
  // Mock fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock profile data
      const mockProfile: UserProfile = {
        id: id || '1',
        username: isOwnProfile ? user?.username || 'cosmic_voyager' : 'stellar_dreamer',
        avatar: isOwnProfile ? user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' : 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        banner: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        bio: isOwnProfile 
          ? 'Explorer of digital universes. Building the future of social connection.'
          : 'AI researcher and cosmic enthusiast. Exploring the intersection of technology and consciousness.',
        location: 'Neo Tokyo, Digital District',
        website: 'https://nebulaverse.io',
        joinDate: 'January 2025',
        stats: {
          posts: 157,
          following: isOwnProfile ? user?.following || 342 : 482,
          followers: isOwnProfile ? user?.followers || 1289 : 2456
        }
      };
      
      setProfile(mockProfile);
      setIsLoading(false);
    };
    
    fetchProfile();
  }, [id, isOwnProfile, user]);
  
  if (isLoading || !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Banner */}
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-16">
        <img 
          src={profile.banner} 
          alt="Profile banner" 
          className="w-full h-full object-cover"
        />
        
        {/* Avatar */}
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <img 
              src={profile.avatar} 
              alt={profile.username} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-bg-primary"
            />
            {isOwnProfile && (
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Edit Profile Button */}
        {isOwnProfile && (
          <div className="absolute bottom-4 right-4">
            <button className="btn btn-primary flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Profile Info */}
      <div className="px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{profile.username}</h1>
            <div className="flex items-center space-x-1 text-text-tertiary mt-1">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{isOwnProfile ? user?.email : 'contact@stellardreamer.com'}</span>
            </div>
          </div>
          
          {!isOwnProfile && (
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="btn btn-primary">Follow</button>
              <button className="btn btn-ghost">Message</button>
            </div>
          )}
        </div>
        
        <p className="mt-4 text-text-primary">{profile.bio}</p>
        
        <div className="mt-3 flex flex-wrap gap-y-2">
          {profile.location && (
            <div className="flex items-center text-text-tertiary mr-6">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{profile.location}</span>
            </div>
          )}
          
          {profile.website && (
            <div className="flex items-center text-primary mr-6">
              <LinkIcon className="w-4 h-4 mr-1" />
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                {profile.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          
          <div className="flex items-center text-text-tertiary">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">Joined {profile.joinDate}</span>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-6">
          <div>
            <span className="font-bold text-text-primary">{profile.stats.posts}</span>
            <span className="text-text-tertiary ml-1">Posts</span>
          </div>
          <div>
            <span className="font-bold text-text-primary">{profile.stats.following}</span>
            <span className="text-text-tertiary ml-1">Following</span>
          </div>
          <div>
            <span className="font-bold text-text-primary">{profile.stats.followers}</span>
            <span className="text-text-tertiary ml-1">Followers</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-8 border-b border-bg-tertiary">
        <div className="flex space-x-1 px-6">
          {['posts', 'media', 'likes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-4 font-medium relative
                ${activeTab === tab ? 'text-primary' : 'text-text-tertiary hover:text-text-secondary'}
              `}
            >
              <span className="capitalize">{tab}</span>
              {activeTab === tab && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                  layoutId="activeTab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="py-6">
        {activeTab === 'posts' && (
          <div className="px-6">
            <div className="bg-bg-secondary rounded-xl p-4 text-center py-12">
              <h3 className="text-lg font-medium text-text-primary">No posts yet</h3>
              <p className="text-text-tertiary mt-2">Posts will appear here when they're created.</p>
            </div>
          </div>
        )}
        
        {activeTab === 'media' && (
          <div className="px-6">
            <div className="bg-bg-secondary rounded-xl p-4 text-center py-12">
              <h3 className="text-lg font-medium text-text-primary">No media yet</h3>
              <p className="text-text-tertiary mt-2">Media posts will appear here.</p>
            </div>
          </div>
        )}
        
        {activeTab === 'likes' && (
          <div className="px-6">
            <div className="bg-bg-secondary rounded-xl p-4 text-center py-12">
              <h3 className="text-lg font-medium text-text-primary">No likes yet</h3>
              <p className="text-text-tertiary mt-2">Posts you like will appear here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;