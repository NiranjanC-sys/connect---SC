import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import AIOrb from '../three/AIOrb';
import ProgressSteps from './ProgressSteps';
import ChatBubble from './ChatBubble';
import { useAppStore } from '../../store/appStore';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [isOrbAnimating, setIsOrbAnimating] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { 
    messages, 
    addMessage, 
    chatStages, 
    currentStage, 
    setCurrentStage,
    setLoading,
    setCurrentScreen,
    setStartupIdea
  } = useAppStore();
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Simulate initial AI message if there are no messages
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage({
          content: "Hi there! I'm Trae AI. Tell me about your startup idea in a few sentences, and I'll help validate it.",
          sender: 'ai'
        });
      }, 1000);
    }
  }, [addMessage, messages.length]);
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    addMessage({
      content: input,
      sender: 'user'
    });
    
    setInput('');
    setIsOrbAnimating(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Different responses based on the current stage
      let aiResponse = '';
      
      if (currentStage === 0) {
        aiResponse = "Great idea! Let's dive deeper. What problem are you trying to solve, and who is your target market?";
        setCurrentStage(1);
      } else if (currentStage === 1) {
        aiResponse = "That's helpful! One last question - how do you plan to monetize this, and what's your unique advantage?";
        setCurrentStage(2);
      } else if (currentStage === 2) {
        aiResponse = "Perfect! I have enough information to analyze your startup idea. Let me generate a summary and prepare a detailed analysis with our specialized AI agents.";
        
        // Mock startup idea data (in a real app, this would be extracted from the conversation)
        const mockStartupIdea = {
          title: "AI-Powered Real Estate Matching",
          problem: "Traditional real estate searching is time-consuming and inefficient",
          solution: "AI algorithm that matches buyers with properties based on subtle preferences",
          techStack: ["Machine Learning", "Computer Vision", "Mobile App"],
          monetization: "Subscription-based model for realtors, free for home seekers",
          vision: "Revolutionize how people find their perfect home",
          targetMarket: "First-time homebuyers and real estate agencies"
        };
        
        setStartupIdea(mockStartupIdea);
        
        // Transition to summary page after a delay
        setTimeout(() => {
          setIsOrbAnimating(false);
          setLoading(true, 'Generating startup summary...');
          
          setTimeout(() => {
            setLoading(false);
            setCurrentScreen('summary');
            navigate('/summary');
          }, 3000);
        }, 2000);
      }
      
      if (aiResponse) {
        addMessage({
          content: aiResponse,
          sender: 'ai'
        });
      }
      
      setIsOrbAnimating(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex h-full w-full">
      {/* Left panel - AI Orb */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="hidden md:flex flex-col items-center w-1/4 pt-24"
      >
        <div className="sticky top-24 flex flex-col items-center">
          <AIOrb isAnimating={isOrbAnimating} className="w-48 h-48" />
          <h3 className="mt-4 text-xl font-medium text-primary-300">Trae AI Assistant</h3>
          <p className="mt-2 text-sm text-neutral-400 text-center max-w-xs">
            I'm analyzing your startup idea and providing expert validation
          </p>
        </div>
      </motion.div>
      
      {/* Center panel - Chat */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 flex flex-col h-full max-w-3xl mx-auto pt-24 pb-8 px-4"
      >
        <ProgressSteps steps={chatStages} currentStep={currentStage} />
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto my-6 glass-panel p-6">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <ChatBubble 
                key={message.id}
                message={message}
                showAvatar={index === 0 || messages[index - 1].sender !== message.sender}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input area */}
        <div className="mt-auto">
          <div 
            className={`relative glass-panel p-2 transition-all duration-300 ${
              isInputFocused ? 'glow-border' : ''
            }`}
          >
            <div className="flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="Tell me about your startup idea..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-500 resize-none py-2 px-4 max-h-40"
                rows={1}
              />
              
              <div className="flex items-center space-x-2 px-2">
                <button 
                  className="p-2 rounded-full hover:bg-neutral-800 transition-colors"
                  aria-label="Voice input"
                >
                  <Mic className="w-5 h-5 text-neutral-400" />
                </button>
                
                <button 
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className={`p-2 rounded-full transition-colors ${
                    input.trim() 
                      ? 'bg-primary-500 hover:bg-primary-600' 
                      : 'bg-neutral-800 cursor-not-allowed'
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-neutral-500 text-center">
            Press Enter to send · Shift+Enter for a new line
          </div>
        </div>
      </motion.div>
      
      {/* Right panel - Next */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="hidden md:flex flex-col items-center justify-center w-1/4 pt-24"
      >
        {currentStage === 2 && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => {
              setLoading(true, 'Generating startup summary...');
              setTimeout(() => {
                setLoading(false);
                setCurrentScreen('summary');
                navigate('/summary');
              }, 2000);
            }}
            className="flex items-center space-x-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 py-3 px-5 rounded-lg transition-colors"
          >
            <span>Continue to Summary</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ChatInterface;