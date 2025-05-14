import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface Story {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  seen: boolean;
}

const StoryCarousel = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  
  // Generate mock stories
  useEffect(() => {
    const mockStories: Story[] = [
      {
        id: '1',
        user: {
          id: '1',
          username: 'Your Story',
          avatar: user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        seen: false
      },
      {
        id: '2',
        user: {
          id: '2',
          username: 'stellar_dreamer',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        seen: false
      },
      {
        id: '3',
        user: {
          id: '3',
          username: 'nebula_navigator',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        seen: true
      },
      {
        id: '4',
        user: {
          id: '4',
          username: 'quantum_coder',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        seen: false
      },
      {
        id: '5',
        user: {
          id: '5',
          username: 'cyber_nexus',
          avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        seen: true
      },
      {
        id: '6',
        user: {
          id: '6',
          username: 'digital_nomad',
          avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        seen: false
      },
      {
        id: '7',
        user: {
          id: '7',
          username: 'virtual_architect',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        seen: true
      }
    ];
    
    setStories(mockStories);
  }, [user]);
  
  // Check if carousel is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth } = carouselRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };
    
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    
    return () => {
      window.removeEventListener('resize', checkScrollable);
    };
  }, [stories]);
  
  // Animation for story ring on hover using Three.js and GSAP
  const handleStoryHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const ring = target.querySelector('.story-ring');
    
    if (ring) {
      // Create a torus geometry from Three.js just for the math
      const torus = new THREE.TorusGeometry(1, 0.2, 16, 100);
      const positions = torus.attributes.position.array;
      
      // Use GSAP for animation
      gsap.to(target, {
        scale: 1.05,
        duration: 0.3,
      });
      
      // Create a subtle pulse effect
      gsap.to(ring, {
        boxShadow: '0 0 15px rgba(99, 102, 241, 0.7)',
        duration: 0.5,
      });
    }
  };
  
  const handleStoryLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const ring = target.querySelector('.story-ring');
    
    if (ring) {
      gsap.to(target, {
        scale: 1,
        duration: 0.3,
      });
      
      gsap.to(ring, {
        boxShadow: 'none',
        duration: 0.5,
      });
    }
  };

  return (
    <motion.div
      className="bg-bg-secondary rounded-xl p-4 shadow-sm"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center flex-shrink-0"
            onMouseEnter={handleStoryHover}
            onMouseLeave={handleStoryLeave}
          >
            <div className={`story-ring ${story.seen ? 'bg-bg-tertiary' : ''}`}>
              <div className="p-[2px] rounded-full">
                <img 
                  src={story.user.avatar} 
                  alt={story.user.username} 
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-text-secondary mt-2 truncate w-16 text-center">
              {story.user.username}
            </span>
          </div>
        ))}
      </div>
      
      {isScrollable && (
        <div className="flex justify-center mt-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-bg-tertiary"></div>
            <div className="w-2 h-2 rounded-full bg-bg-tertiary"></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StoryCarousel;