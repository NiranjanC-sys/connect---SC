import React from 'react';
import { Twitter, Youtube, Instagram, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Pokidoc</h3>
            <p className="text-gray-400">
              Making healthcare accessible and affordable for everyone through technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a href="mailto:pokidoc.aid@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-green-400">
                <Mail className="w-5 h-5" />
                pokidoc.aid@gmail.com
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://x.com/pokidoc_india?t=xWooFe4Oh-3g1tWJ78azdg&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@pokidoc?si=Eq7VMdnLNPBWXiYI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/pokidoc_india/profilecard/?igsh=YzI1bGhrMGx6YjY3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Pokidoc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};