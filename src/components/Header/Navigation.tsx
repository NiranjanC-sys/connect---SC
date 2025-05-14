import React from 'react';
import { NAV_ITEMS } from './constants';

export default function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`text-gray-700 hover:text-blue-600 transition-colors ${
            item.isActive ? 'text-blue-600 border-b-2 border-blue-600' : ''
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}