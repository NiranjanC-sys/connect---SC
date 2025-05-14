import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollButtonsProps {
  onScroll: (direction: 'left' | 'right') => void;
}

export default function ScrollButtons({ onScroll }: ScrollButtonsProps) {
  return (
    <div className="flex space-x-4">
      <button 
        onClick={() => onScroll('left')}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={() => onScroll('right')}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}