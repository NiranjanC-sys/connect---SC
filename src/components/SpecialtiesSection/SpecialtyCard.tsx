import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SpecialtyCardProps {
  icon: LucideIcon;
  name: string;
  price: string;
}

export default function SpecialtyCard({ icon: Icon, name, price }: SpecialtyCardProps) {
  return (
    <div className="flex-shrink-0 w-64 group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-center font-medium text-gray-900">{name}</h3>
      <p className="text-center text-gray-600 mt-1">₹{price}</p>
      <button className="w-full mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300">
        Consult now
      </button>
    </div>
  );
}