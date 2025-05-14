import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Share2 } from 'lucide-react';

import AgentCard from './AgentCard';
import { useAppStore } from '../../store/appStore';

// Mock agent results for demo
const mockAgentResults = [
  {
    type: 'idea',
    title: 'Idea Agent',
    score: 82,
    risks: [
      'Technology implementation complexity',
      'Differentiation from existing solutions'
    ],
    summary: 'Your AI-powered real estate matching concept is innovative and addresses a clear market need. There are some implementation challenges to overcome.',
    details: 'Detailed analysis of the idea...\n\n- The idea solves a real problem that many home buyers face\n- The use of AI for preference matching is innovative\n- Consider adding AR/VR features for virtual home tours\n- Need to clarify how the AI will handle complex preference combinations',
    status: 'completed'
  },
  {
    type: 'market',
    title: 'Market Agent',
    score: 78,
    risks: [
      'Seasonal market fluctuations',
      'Regional market differences'
    ],
    summary: 'The real estate market is sizeable with good growth potential. Your timing is favorable with increasing digital adoption in the industry.',
    details: 'Detailed market analysis...\n\n- Market size: $120B in the US alone\n- Growth rate: 4.5% annually\n- Digital adoption increasing by 15% YoY\n- Key markets: urban areas, first-time home buyers\n- Consider focusing on millennials as early adopters',
    status: 'completed'
  },
  {
    type: 'competitor',
    title: 'Competitor Agent',
    score: 65,
    risks: [
      'Established players with large user bases',
      'Low barriers to entry for core features'
    ],
    summary: 'The space is competitive with large incumbents like Zillow and Redfin, but your AI-driven approach offers unique advantages if executed well.',
    details: 'Competitor landscape...\n\n- Direct competitors: Zillow, Redfin, Trulia\n- Indirect: Traditional real estate agencies\n- Differentiators needed: more accurate matching, better UX, unique features\n- Consider partnerships with mortgage providers for additional revenue',
    status: 'completed'
  },
  {
    type: 'risk',
    title: 'Risk Agent',
    score: 71,
    risks: [
      'Data privacy concerns',
      'AI accuracy and user trust',
      'Dependency on MLS data access'
    ],
    summary: 'Primary risks revolve around data access, privacy regulations, and the accuracy of your AI matching algorithm. Mitigation strategies are available.',
    details: 'Risk analysis and mitigation...\n\n- Regulatory: GDPR and CCPA compliance required\n- Technical: Algorithm accuracy validation needed\n- Market: Real estate downturn resilience plan\n- Operational: Scaling customer support with growth\n- Financial: 18-month runway recommended',
    status: 'pending'
  },
  {
    type: 'vc',
    title: 'VC Matching Agent',
    score: 74,
    risks: [
      'Requires substantial early funding',
      'Long path to profitability'
    ],
    summary: 'Your startup fits the investment thesis of PropTech VCs and tech-focused real estate investors. Early traction metrics will be critical.',
    details: 'VC matching and funding strategy...\n\n- Potential investors: PropTech Ventures, Fifth Wall, MetaProp\n- Funding stages: $500K seed, $3M Series A\n- Key metrics for investors: user growth, engagement, listing accuracy\n- Valuation range: $4-6M pre-money\n- Term sheet considerations provided',
    status: 'needs_clarification'
  }
];

const AgentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentScreen } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Filter agents if a filter is active
  const filteredAgents = activeFilter 
    ? mockAgentResults.filter(agent => agent.type === activeFilter)
    : mockAgentResults;
  
  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center"
        >
          <button 
            onClick={() => {
              setCurrentScreen('summary');
              navigate('/summary');
            }}
            className="mr-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-400" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-white">Multi-Agent Analysis</h1>
            <p className="text-neutral-400">Comprehensive evaluation from different perspectives</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex space-x-3"
        >
          <button className="py-2 px-4 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-neutral-300 text-sm font-medium flex items-center transition-colors">
            <Save className="w-4 h-4 mr-2" />
            Save Analysis
          </button>
          <button className="py-2 px-4 bg-primary-600 hover:bg-primary-700 rounded-lg text-white text-sm font-medium flex items-center transition-colors">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </motion.div>
      </div>
      
      {/* Agent filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex flex-wrap gap-2"
      >
        <FilterButton 
          label="All Agents" 
          active={activeFilter === null} 
          onClick={() => setActiveFilter(null)} 
        />
        <FilterButton 
          label="Idea" 
          active={activeFilter === 'idea'} 
          onClick={() => setActiveFilter('idea')} 
          color="bg-blue-500/20 text-blue-400"
        />
        <FilterButton 
          label="Market" 
          active={activeFilter === 'market'} 
          onClick={() => setActiveFilter('market')} 
          color="bg-green-500/20 text-green-400"
        />
        <FilterButton 
          label="Competitor" 
          active={activeFilter === 'competitor'} 
          onClick={() => setActiveFilter('competitor')} 
          color="bg-orange-500/20 text-orange-400"
        />
        <FilterButton 
          label="Risk" 
          active={activeFilter === 'risk'} 
          onClick={() => setActiveFilter('risk')} 
          color="bg-red-500/20 text-red-400"
        />
        <FilterButton 
          label="VC Matching" 
          active={activeFilter === 'vc'} 
          onClick={() => setActiveFilter('vc')} 
          color="bg-purple-500/20 text-purple-400"
        />
      </motion.div>
      
      {/* Agent cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.type} agent={agent} />
        ))}
      </div>
      
      {/* 3D Visualization would be implemented here */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass-panel p-6 h-80 flex items-center justify-center"
      >
        <div className="text-center text-neutral-400">
          <p className="mb-2">3D Agent Relationship Visualization</p>
          <p className="text-sm italic">(Interactive Three.js visualization showing connections between agents and the startup core would render here)</p>
        </div>
      </motion.div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  active, 
  onClick,
  color = "bg-primary-500/20 text-primary-300" 
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active 
          ? color
          : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
      }`}
    >
      {label}
    </button>
  );
};

export default AgentDashboard;