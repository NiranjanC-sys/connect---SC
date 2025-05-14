import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, DollarSign } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: 'Long Waiting Times',
    description: 'Tired of spending hours in crowded waiting rooms for a simple consultation?'
  },
  {
    icon: MapPin,
    title: 'Limited Access',
    description: 'Rural communities struggle to find quality healthcare within reasonable distances'
  },
  {
    icon: DollarSign,
    title: 'High Costs',
    description: 'Traditional healthcare often comes with unexpected and expensive bills'
  }
];

export const Problem = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Why Does Getting Healthcare Still Feel So Hard?
          </h2>
          <p className="text-xl text-gray-300">
            Because busy professionals don't have time, rural families don't have access, and nobody likes long waits in clinics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
              <p className="text-gray-400">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};