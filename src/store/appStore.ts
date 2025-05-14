import { create } from 'zustand';
import { Message, AgentResult, StartupIdea, ChatStage } from '../types';

interface AppState {
  messages: Message[];
  currentScreen: 'landing' | 'chat' | 'summary' | 'dashboard';
  chatStages: ChatStage[];
  currentStage: number;
  agentResults: AgentResult[];
  startupIdea: StartupIdea | null;
  loading: boolean;
  loadingMessage: string;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setCurrentScreen: (screen: AppState['currentScreen']) => void;
  setCurrentStage: (stage: number) => void;
  setAgentResults: (results: AgentResult[]) => void;
  setStartupIdea: (idea: StartupIdea) => void;
  setLoading: (loading: boolean, message?: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  messages: [],
  currentScreen: 'landing',
  chatStages: [
    { id: 'idea', title: 'Idea', completed: false },
    { id: 'details', title: 'Details', completed: false },
    { id: 'summary', title: 'Summary', completed: false },
  ],
  currentStage: 0,
  agentResults: [],
  startupIdea: null,
  loading: false,
  loadingMessage: '',
  
  addMessage: (message) => 
    set((state) => ({ 
      messages: [...state.messages, {
        ...message,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now()
      }]
    })),
  
  setCurrentScreen: (screen) => 
    set({ currentScreen: screen }),
  
  setCurrentStage: (stage) => 
    set((state) => ({
      currentStage: stage,
      chatStages: state.chatStages.map((s, i) => ({
        ...s,
        completed: i < stage
      }))
    })),
  
  setAgentResults: (results) => 
    set({ agentResults: results }),
  
  setStartupIdea: (idea) => 
    set({ startupIdea: idea }),
  
  setLoading: (loading, message = 'Processing...') => 
    set({ loading, loadingMessage: message }),
}));