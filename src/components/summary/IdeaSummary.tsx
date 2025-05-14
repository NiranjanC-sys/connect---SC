import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart, Download, Edit, ArrowRight, CheckCircle, Zap, Target, DollarSign, Users, Lightbulb } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const IdeaSummary: React.FC = () => {
  const navigate = useNavigate();
  const { startupIdea, setLoading, setCurrentScreen } = useAppStore();

  const handleContinue = () => {
    setLoading(true, 'Analyzing with AI agents...');
    
    // Simulate loading for demo purposes
    setTimeout(() => {
      setLoading(false);
      setCurrentScreen('dashboard');
      navigate('/dashboard');
    }, 2500);
  };
  
  // Guard for when startupIdea is null
  if (!startupIdea) {
    return <div className="text-center py-10">No startup idea data available</div>;
  }
  
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8 px-4 pt-24 pb-12">
      {/* Left column - JSON fields as cards */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <div className="glass-panel p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{startupIdea.title}</h2>
            <button className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors">
              <Edit className="w-4 h-4 text-neutral-300" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-success-500/20 text-success-500 rounded-full px-3 py-1 text-xs font-medium flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                Validated
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg px-3 py-1 text-xs font-medium flex items-center transition-colors">
                <Download className="w-3 h-3 mr-1" />
                Export PDF
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg px-3 py-1 text-xs font-medium flex items-center transition-colors">
                <BarChart className="w-3 h-3 mr-1" />
                Export JSON
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <SummaryCard 
            title="Problem" 
            content={startupIdea.problem}
            icon={<Lightbulb className="w-5 h-5 text-error-500" />}
          />
          
          <SummaryCard 
            title="Solution" 
            content={startupIdea.solution}
            icon={<Zap className="w-5 h-5 text-success-500" />}
          />
          
          <SummaryCard 
            title="Target Market" 
            content={startupIdea.targetMarket}
            icon={<Target className="w-5 h-5 text-warning-500" />}
          />
          
          <SummaryCard 
            title="Monetization" 
            content={startupIdea.monetization}
            icon={<DollarSign className="w-5 h-5 text-primary-500" />}
          />
          
          <SummaryCard 
            title="Vision" 
            content={startupIdea.vision}
            icon={<Users className="w-5 h-5 text-accent-500" />}
          />
          
          <div className="glass-panel p-6">
            <h3 className="text-sm font-medium text-neutral-400 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {startupIdea.techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="bg-primary-500/20 text-primary-300 rounded-full px-3 py-1 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={handleContinue}
          className="mt-8 glow-button w-full"
        >
          <span className="flex items-center justify-center">
            Continue to AI Analysis
            <ArrowRight className="ml-2 w-4 h-4" />
          </span>
        </motion.button>
      </motion.div>
      
      {/* Right column - 3D visualization */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex-1 glass-panel p-6 lg:min-h-[600px] flex flex-col"
      >
        <h2 className="text-xl font-bold mb-4">Keyword Analysis</h2>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-neutral-400">
            <p className="mb-2">3D visualization of startup keywords</p>
            <p className="text-sm italic">(Three.js visualization would render here)</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, content, icon }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 * Math.random() }}
      className="glass-panel p-6"
    >
      <div className="flex items-center mb-3">
        {icon && <div className="mr-2">{icon}</div>}
        <h3 className="text-sm font-medium text-neutral-400">{title}</h3>
      </div>
      <p className="text-white">{content}</p>
    </motion.div>
  );
};

export default IdeaSummary;