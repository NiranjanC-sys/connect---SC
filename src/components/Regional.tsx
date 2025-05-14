import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Languages, Users, Clock } from 'lucide-react';

export const Regional = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              One State at a Time – Starting with Tamil Nadu
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're making healthcare accessible and easy for everyone by offering our services in Tamil and English.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Languages className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Multi-Language Support</h3>
                  <p className="text-gray-600">Available in Tamil and English for better accessibility</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Local Network</h3>
                  <p className="text-gray-600">Connected with local doctors and healthcare providers</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Round-the-clock assistance in your preferred language</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Local Presence</h3>
                  <p className="text-gray-600">Regular health camps and community engagement</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80"
              alt="Healthcare in Tamil Nadu"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl flex items-end p-8">
              <div className="text-white">
                <p className="text-2xl font-bold mb-2">Starting in Chennai</p>
                <p>Expanding across Tamil Nadu by 2024</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};