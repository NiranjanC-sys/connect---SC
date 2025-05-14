import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <Navigation />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}