import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Video, MoreHorizontal, Search, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    online: boolean;
    lastSeen?: string;
  };
  messages: Message[];
  unreadCount: number;
}

const Chat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileConversation, setShowMobileConversation] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Generate mock conversations
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockConversations: Conversation[] = [
        {
          id: '1',
          user: {
            id: '2',
            username: 'stellar_dreamer',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            online: true
          },
          messages: [
            { id: '1', senderId: '2', text: 'Hey, have you seen the new quantum computing breakthrough?', timestamp: '10:30 AM', read: true },
            { id: '2', senderId: user?.id || '1', text: 'Not yet! Tell me more about it', timestamp: '10:32 AM', read: true },
            { id: '3', senderId: '2', text: "They've managed to maintain quantum coherence for over 10 minutes!", timestamp: '10:33 AM', read: true },
            { id: '4', senderId: '2', text: 'This could revolutionize our neural network architecture', timestamp: '10:34 AM', read: true },
            { id: '5', senderId: user?.id || '1', text: "Wow! That's incredible. We should integrate this into our project", timestamp: '10:36 AM', read: true }
          ],
          unreadCount: 0
        },
        {
          id: '2',
          user: {
            id: '3',
            username: 'nebula_navigator',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            online: false,
            lastSeen: '2h ago'
          },
          messages: [
            { id: '1', senderId: user?.id || '1', text: "How's the AI project going?", timestamp: 'Yesterday', read: true },
            { id: '2', senderId: '3', text: 'Making good progress! The neural network is learning faster than expected', timestamp: 'Yesterday', read: true },
            { id: '3', senderId: '3', text: 'Can we meet to discuss the next phase?', timestamp: '9:45 AM', read: false }
          ],
          unreadCount: 2
        },
        {
          id: '3',
          user: {
            id: '4',
            username: 'quantum_coder',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            online: true
          },
          messages: [
            { id: '1', senderId: '4', text: 'Check out this new library I just published', timestamp: '2d ago', read: true },
            { id: '2', senderId: user?.id || '1', text: "Looks impressive! How's the performance?", timestamp: '2d ago', read: true },
            { id: '3', senderId: '4', text: '30% faster than the previous version', timestamp: '2d ago', read: true },
            { id: '4', senderId: '4', text: '40% less memory usage too!', timestamp: 'Yesterday', read: false }
          ],
          unreadCount: 1
        }
      ];
      
      setConversations(mockConversations);
      setActiveConversation(mockConversations[0].id);
      setIsLoading(false);
    }, 1000);
  }, [user]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation, conversations]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !activeConversation) return;
    
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      senderId: user?.id || '1',
      text: message,
      timestamp: 'Just now',
      read: false
    };
    
    setConversations(conversations.map(convo => {
      if (convo.id === activeConversation) {
        return {
          ...convo,
          messages: [...convo.messages, newMessage]
        };
      }
      return convo;
    }));
    
    setMessage('');
  };
  
  const handleConversationClick = (conversationId: string) => {
    setActiveConversation(conversationId);
    setShowMobileConversation(true);
    
    // Mark messages as read
    setConversations(conversations.map(convo => {
      if (convo.id === conversationId) {
        return {
          ...convo,
          messages: convo.messages.map(msg => ({ ...msg, read: true })),
          unreadCount: 0
        };
      }
      return convo;
    }));
  };
  
  const activeConvo = conversations.find(c => c.id === activeConversation);

  return (
    <div className="h-[calc(100vh-12rem)] bg-bg-secondary rounded-xl shadow-sm overflow-hidden">
      <div className="flex h-full">
        {/* Conversation List - Hidden on mobile when conversation is open */}
        <div className={`w-full md:w-1/3 lg:w-1/4 border-r border-bg-tertiary overflow-hidden ${showMobileConversation ? 'hidden md:block' : 'block'}`}>
          <div className="p-4 border-b border-bg-tertiary">
            <h2 className="text-xl font-bold text-text-primary mb-4">Messages</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-bg-primary rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            </div>
          </div>
          
          {/* Conversation List */}
          <div className="overflow-y-auto h-[calc(100%-80px)]">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <AnimatePresence>
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      p-4 flex items-center space-x-3 cursor-pointer transition-colors
                      ${activeConversation === conversation.id ? 'bg-bg-tertiary' : 'hover:bg-bg-tertiary/50'}
                    `}
                    onClick={() => handleConversationClick(conversation.id)}
                  >
                    <div className="relative">
                      <img 
                        src={conversation.user.avatar} 
                        alt={conversation.user.username} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-bg-secondary"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-text-primary truncate">{conversation.user.username}</h3>
                        <span className="text-xs text-text-tertiary">
                          {conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].timestamp : ''}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-text-secondary truncate">
                          {conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].text : ''}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                          >
                            {conversation.unreadCount}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
        
        {/* Chat Window */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeConversation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`w-full md:w-2/3 lg:w-3/4 flex flex-col ${!showMobileConversation ? 'hidden md:flex' : 'flex'}`}
          >
            {activeConvo ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-bg-tertiary flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button 
                      className="md:hidden p-1 rounded-full hover:bg-bg-tertiary"
                      onClick={() => setShowMobileConversation(false)}
                    >
                      <ArrowLeft className="w-5 h-5 text-text-primary" />
                    </button>
                    
                    <div className="relative">
                      <img 
                        src={activeConvo.user.avatar} 
                        alt={activeConvo.user.username} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {activeConvo.user.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-bg-secondary"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-text-primary">{activeConvo.user.username}</h3>
                      <p className="text-xs text-text-tertiary">
                        {activeConvo.user.online ? 'Online' : `Last seen ${activeConvo.user.lastSeen}`}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {activeConvo.messages.map((msg, index) => {
                      const isOwn = msg.senderId === user?.id;
                      
                      return (
                        <motion.div
                          key={msg.id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className={`
                            max-w-[75%] rounded-xl p-3
                            ${isOwn 
                              ? 'bg-primary text-white rounded-br-none' 
                              : 'bg-bg-tertiary text-text-primary rounded-bl-none'}
                          `}>
                            <p>{msg.text}</p>
                            <div className={`text-xs mt-1 flex items-center justify-end space-x-1
                              ${isOwn ? 'text-primary-light' : 'text-text-tertiary'}
                            `}>
                              <span>{msg.timestamp}</span>
                              {isOwn && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className={`w-4 h-4 ${msg.read ? 'text-primary-light' : 'text-primary-dark'}`}
                                >
                                  ✓
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  <div ref={messageEndRef} />
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-bg-tertiary">
                  <form onSubmit={handleSendMessage} className="flex space-x-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 py-3 px-4 bg-bg-primary rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <motion.button
                      type="submit"
                      disabled={!message.trim()}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        btn btn-primary rounded-xl px-4
                        ${!message.trim() ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-bg-tertiary mx-auto flex items-center justify-center mb-4">
                    <MessageCircle className="w-10 h-10 text-text-tertiary" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary">Your Messages</h3>
                  <p className="text-text-tertiary mt-2">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chat;