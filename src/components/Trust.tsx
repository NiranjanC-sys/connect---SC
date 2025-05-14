import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Building2, Users, Award } from 'lucide-react';

const trustFactors = [
  {
    icon: Shield,
    title: 'Verified Doctors',
    description: 'All our doctors are verified professionals with valid medical licenses'
  },
  {
    icon: Building2,
    title: 'Hospital Partners',
    description: 'We collaborate with trusted local clinics and hospitals'
  },
  {
    icon: Users,
    title: 'Community Presence',
    description: 'Regular health camps and check-up drives in rural areas'
  },
  {
    icon: Award,
    title: 'Quality Care',
    description: 'Strict quality standards and regular performance monitoring'
  }
];

export const Trust = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Trusted Care by Verified Doctors You Can Count On
          </h2>
          <p className="text-xl text-gray-600">
            We're building a healthcare platform that puts trust and quality first
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFactors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <factor.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{factor.title}</h3>
              <p className="text-gray-600">{factor.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2"
          >
            Learn More About Our Standards
          </motion.button>
        </div>
      </div>
    </section>
  );
};