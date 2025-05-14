import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, CheckCircle, ChevronUp } from 'lucide-react';
import { AgentResult } from '../../types';

interface AgentCardProps {
  agent: AgentResult;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-500/20 text-success-500';
      case 'pending':
        return 'bg-warning-500/20 text-warning-500';
      case 'needs_clarification':
        return 'bg-error-500/20 text-error-500';
      default:
        return 'bg-neutral-500/20 text-neutral-500';
    }
  };
  
  const getAgentColor = (type: string) => {
    switch (type) {
      case 'idea':
        return 'from-blue-500 to-blue-700';
      case 'market':
        return 'from-green-500 to-green-700';
      case 'competitor':
        return 'from-orange-500 to-orange-700';
      case 'risk':
        return 'from-red-500 to-red-700';
      case 'vc':
        return 'from-purple-500 to-purple-700';
      default:
        return 'from-neutral-500 to-neutral-700';
    }
  };
  
  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'idea':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>;
      case 'market':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>;
      case 'competitor':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;
      case 'risk':
        return <AlertTriangle className="w-5 h-5" />;
      case 'vc':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };
  
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-panel overflow-hidden"
    >
      {/* Card header with gradient */}
      <div className={`bg-gradient-to-r ${getAgentColor(agent.type)} px-6 py-4 flex justify-between items-center`}>
        <div className="flex items-center">
          <div className="rounded-full bg-white/20 p-2 mr-3">
            {getAgentIcon(agent.type)}
          </div>
          <h3 className="font-bold text-white">{agent.title}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`rounded-full px-3 py-1 text-xs ${getStatusColor(agent.status)}`}>
            {agent.status.replace('_', ' ')}
          </div>
          
          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
            <span className="text-white font-bold">{agent.score}</span>
          </div>
        </div>
      </div>
      
      {/* Card body */}
      <div className="px-6 py-4">
        <p className="text-neutral-200">{agent.summary}</p>
        
        {/* Risks section */}
        {agent.risks.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-neutral-400 mb-2">Key Risks:</h4>
            <ul className="space-y-1">
              {agent.risks.map((risk, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-error-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-neutral-300">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Expand/collapse button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            {expanded ? (
              <>
                <span>Hide details</span>
                <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show details</span>
                <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </button>
        </div>
        
        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <div className="neumorphic-inset p-4 text-sm text-neutral-300 whitespace-pre-line">
                {agent.details}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AgentCard;