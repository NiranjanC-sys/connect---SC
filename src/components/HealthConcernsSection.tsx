import React from 'react';
import { ChevronRight } from '../components/icons';
import { healthConcerns } from '../data/healthConcerns';

export default function HealthConcernsSection() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Common Health Concerns</h2>
            <p className="text-gray-600 mt-2">Consult a doctor online for any health issue</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            See All Symptoms
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthConcerns.map((concern) => (
            <div
              key={concern.title}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={concern.image}
                  alt={concern.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{concern.title}</h3>
                <p className="text-gray-600 mt-1">₹{concern.price}</p>
                <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  Consult Now
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}