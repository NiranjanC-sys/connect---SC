import React from 'react';
import { motion } from 'framer-motion';
import { User, BrainCircuit } from 'lucide-react';
import { Message } from '../../types';

interface ChatBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message,
  showAvatar = true
}) => {
  const isAI = message.sender === 'ai';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[80%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        {showAvatar && (
          <div className={`flex-shrink-0 ${isAI ? 'mr-3' : 'ml-3'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isAI ? 'bg-primary-500/20' : 'bg-neutral-800'
            }`}>
              {isAI ? (
                <BrainCircuit className="w-4 h-4 text-primary-400" />
              ) : (
                <User className="w-4 h-4 text-neutral-300" />
              )}
            </div>
          </div>
        )}
        
        <div>
          <div className={`py-3 px-4 rounded-2xl ${
            isAI 
              ? 'bg-neutral-800/80 text-white' 
              : 'bg-primary-600/20 text-neutral-100'
          }`}>
            <p className="text-sm">{message.content}</p>
          </div>
          
          <div className={`mt-1 text-xs text-neutral-500 ${
            isAI ? 'text-left' : 'text-right'
          }`}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;