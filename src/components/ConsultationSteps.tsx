import React from 'react';
import { Sparkles, Phone, FileCheck } from 'lucide-react';

const steps = [
  {
    icon: Sparkles,
    title: 'Select a speciality or symptom',
    description: 'Choose from our wide range of specialists or describe your symptoms'
  },
  {
    icon: Phone,
    title: 'Audio/video call with a verified doctor',
    description: 'Connect with experienced doctors through secure video consultation'
  },
  {
    icon: FileCheck,
    title: 'Get a digital prescription & a free follow-up',
    description: 'Receive your prescription online and get free follow-up consultation'
  }
];

export default function ConsultationSteps() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center max-w-sm animate-fade-in">
              <step.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 w-8 h-px bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}