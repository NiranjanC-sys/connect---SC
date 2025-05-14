import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import FooterColumn from './FooterColumn';
import { FOOTER_LINKS } from './constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterColumn title="PokiDoc" links={FOOTER_LINKS.pokidoc} />
          <FooterColumn title="For Patients" links={FOOTER_LINKS.patients} />
          <FooterColumn title="For Doctors" links={FOOTER_LINKS.doctors} />
          <div>
            <h3 className="text-white font-semibold mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400">
          <p>&copy; 2024 PokiDoc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}