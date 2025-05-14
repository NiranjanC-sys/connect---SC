import React, { useRef } from 'react';

interface ScrollableContainerProps {
  children: React.ReactNode;
}

export default function ScrollableContainer({ children }: ScrollableContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return {
    scrollRef,
    scroll,
    ScrollableWrapper: (
      <div 
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    )
  };
}