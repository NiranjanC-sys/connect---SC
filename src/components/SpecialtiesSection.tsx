import React from 'react';
import { ChevronRight } from '../components/icons';
import { specialties } from '../data/specialties';

export default function SpecialtiesSection() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">25+ Specialities</h2>
            <p className="text-gray-600 mt-2">Consult with top doctors across specialities</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            See all Specialities
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.map((specialty) => (
            <div
              key={specialty.name}
              className="group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                <specialty.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-center font-medium text-gray-900">{specialty.name}</h3>
              <p className="text-center text-gray-600 mt-1">₹{specialty.price}</p>
              <button className="w-full mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                Consult now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}