import React from 'react';
import { specialties } from '../../data/specialties';
import SpecialtyCard from './SpecialtyCard';
import ScrollButtons from '../common/ScrollableSection/ScrollButtons';
import ScrollableContainer from '../common/ScrollableSection/ScrollableContainer';

export default function SpecialtiesSection() {
  const { scrollRef, scroll, ScrollableWrapper } = ScrollableContainer({
    children: specialties.map((specialty) => (
      <SpecialtyCard
        key={specialty.name}
        icon={specialty.icon}
        name={specialty.name}
        price={specialty.price}
      />
    ))
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">25+ Specialities</h2>
            <p className="text-gray-600 mt-2">Consult with top doctors across specialities</p>
          </div>
          <ScrollButtons onScroll={scroll} />
        </div>
        {ScrollableWrapper}
      </div>
    </div>
  );
}