import React from 'react';
import { Stethoscope } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Stethoscope className="w-8 h-8 text-blue-600 animate-pulse" />
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        PokiDoc
      </span>
    </div>
  );
}