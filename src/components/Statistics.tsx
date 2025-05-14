import React from 'react';

const stats = [
  { number: '2,00,000+', label: 'Happy Users' },
  { number: '20,000+', label: 'Verified Doctors' },
  { number: '25+', label: 'Specialities' },
  { number: '4.5/5', label: 'App Rating' }
];

export default function Statistics() {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="animate-fade-in">
              <div className="text-3xl font-bold mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}