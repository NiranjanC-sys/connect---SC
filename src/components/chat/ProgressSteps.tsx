import React from 'react';
import { motion } from 'framer-motion';
import { ChatStage } from '../../types';

interface ProgressStepsProps {
  steps: ChatStage[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  steps,
  currentStep
}) => {
  return (
    <div className="glass-panel p-4">
      <div className="relative flex items-center justify-between">
        {/* Progress bar */}
        <div className="absolute left-0 top-1/2 h-0.5 bg-neutral-800 w-full -translate-y-1/2" />
        
        <motion.div 
          className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 -translate-y-1/2"
          initial={{ width: '0%' }}
          animate={{ 
            width: `${(currentStep / (steps.length - 1)) * 100}%` 
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <motion.div 
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? 'bg-primary-500'
                  : 'bg-neutral-800'
              }`}
              animate={{
                scale: index === currentStep ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: index === currentStep ? Infinity : 0,
                repeatType: "reverse",
              }}
            >
              {step.completed ? (
                <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="text-xs text-white">{index + 1}</span>
              )}
            </motion.div>
            
            <span className={`mt-2 text-xs ${
              index <= currentStep ? 'text-primary-300' : 'text-neutral-500'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;