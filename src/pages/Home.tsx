import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import StoryCarousel from '../components/stories/StoryCarousel';

interface Post {
  id: string;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  saved: boolean;
  timestamp: string;
}

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock data for posts
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        author: {
          id: '2',
          username: 'stellar_dreamer',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        content: 'Just discovered this amazing quantum computing breakthrough! The future is now. #QuantumComputing #TechNews',
        image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        likes: 245,
        comments: 42,
        shares: 18,
        liked: true,
        saved: false,
        timestamp: '2h ago'
      },
      {
        id: '2',
        author: {
          id: '3',
          username: 'nebula_navigator',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        content: 'Working on a new AI project that can predict cosmic events. Anyone interested in collaborating? #AI #SpaceScience #Collaboration',
        likes: 189,
        comments: 56,
        shares: 7,
        liked: false,
        saved: true,
        timestamp: '4h ago'
      },
      {
        id: '3',
        author: {
          id: '4',
          username: 'quantum_coder',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        content: 'Just released my new open-source library for neural networks optimization. Check it out on my profile! #OpenSource #AI #Programming',
        image: 'https://images.pexels.com/photos/573238/pexels-photo-573238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        likes: 302,
        comments: 78,
        shares: 45,
        liked: false,
        saved: false,
        timestamp: '6h ago'
      }
    ];
    
    setPosts(mockPosts);
  }, []);
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPostObj: Post = {
        id: `new-${Date.now()}`,
        author: {
          id: user?.id || '1',
          username: user?.username || 'unknown',
          avatar: user?.avatar || ''
        },
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        saved: false,
        timestamp: 'Just now'
      };
      
      setPosts([newPostObj, ...posts]);
      setNewPost('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const wasLiked = post.liked;
        return {
          ...post,
          liked: !wasLiked,
          likes: wasLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };
  
  const toggleSave = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          saved: !post.saved
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stories */}
      <div className="mb-6">
        <StoryCarousel />
      </div>
      
      {/* Create Post */}
      <motion.div 
        className="bg-bg-secondary rounded-xl p-4 mb-6 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handlePostSubmit}>
          <div className="flex items-start space-x-3">
            <img 
              src={user?.avatar} 
              alt={user?.username} 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's happening in your universe?"
                className="w-full bg-bg-primary rounded-xl p-3 min-h-[100px] focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex space-x-2">
                  <button 
                    type="button" 
                    className="p-2 rounded-full hover:bg-bg-tertiary text-text-tertiary transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    className="p-2 rounded-full hover:bg-bg-tertiary text-text-tertiary transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newPost.trim() || isSubmitting}
                  className={`
                    btn btn-primary px-4 py-2 rounded-xl flex items-center space-x-2
                    ${!newPost.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span>{isSubmitting ? 'Posting...' : 'Post'}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
      
      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-bg-secondary rounded-xl shadow-sm overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            {/* Post Header */}
            <div className="p-4 flex items-center space-x-3">
              <img 
                src={post.author.avatar} 
                alt={post.author.username} 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-text-primary">{post.author.username}</h3>
                <p className="text-sm text-text-tertiary">{post.timestamp}</p>
              </div>
            </div>
            
            {/* Post Content */}
            <div className="px-4 pb-3">
              <p className="text-text-primary mb-3">{post.content}</p>
              
              {post.image && (
                <div className="rounded-xl overflow-hidden mb-3">
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
            
            {/* Post Actions */}
            <div className="px-4 py-2 border-t border-bg-tertiary flex items-center justify-between">
              <button 
                onClick={() => toggleLike(post.id)}
                className={`
                  flex items-center space-x-1
                  ${post.liked ? 'text-accent' : 'text-text-tertiary hover:text-text-secondary'}
                  transition-colors
                `}
              >
                <Heart className="w-5 h-5" fill={post.liked ? 'currentColor' : 'none'} />
                <span>{post.likes}</span>
              </button>
              
              <button className="flex items-center space-x-1 text-text-tertiary hover:text-text-secondary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              
              <button className="flex items-center space-x-1 text-text-tertiary hover:text-text-secondary transition-colors">
                <Share2 className="w-5 h-5" />
                <span>{post.shares}</span>
              </button>
              
              <button 
                onClick={() => toggleSave(post.id)}
                className={`
                  p-2 rounded-full 
                  ${post.saved ? 'text-secondary' : 'text-text-tertiary hover:text-text-secondary'}
                  transition-colors
                `}
              >
                <Bookmark className="w-5 h-5" fill={post.saved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;