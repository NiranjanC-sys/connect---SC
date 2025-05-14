import React from 'react';
import { ChevronDown, Shield } from 'lucide-react';

export default function UserMenu() {
  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
          <span>For Corporates</span>
          <span className="px-1.5 py-0.5 text-xs bg-blue-600 text-white rounded">NEW</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
          <span>For Providers</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
          <Shield className="w-4 h-4" />
          <span>Security & help</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
        Login / Signup
      </button>
    </div>
  );
}