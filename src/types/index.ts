export interface StartupIdea {
  title: string;
  problem: string;
  solution: string;
  techStack: string[];
  monetization: string;
  vision: string;
  targetMarket: string;
}

export type AgentType = 'idea' | 'market' | 'competitor' | 'risk' | 'vc';

export interface AgentResult {
  type: AgentType;
  title: string;
  score: number;
  risks: string[];
  summary: string;
  details: string;
  status: 'pending' | 'completed' | 'needs_clarification';
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface ChatStage {
  id: string;
  title: string;
  completed: boolean;
}