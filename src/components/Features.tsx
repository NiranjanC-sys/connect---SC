import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Video, TestTube, Truck, FileText } from 'lucide-react';

const features = [
  {
    icon: Video,
    title: 'Real-Time Glucose Monitoring',
    description: 'Stay informed with continuous glucose trend predictions and alerts'
  },
  {
    icon: TestTube,
    title: 'Personalized Meal Plans',
    description: 'Receive tailored meal suggestions based on your glucose levels and dietary needs'
  },
  {
    icon: Truck,
    title: 'Lifestyle Recommendations',
    description: 'Get dynamic workout and lifestyle adjustments to maintain stable blood sugar levels'
  },
  {
    icon: FileText,
    title: 'Comprehensive Health Tracking',
    description: 'Monitor sleep, activity, and stress for a holistic approach to diabetes management'
  }
];

const FeatureCard = ({ icon: Icon, title, description, index }: {
  icon: React.ComponentType<any>,
  title: string,
  description: string,
  index: number
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
    >
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            AI-Driven Diabetes Management
          </h2>
          <p className="text-xl text-gray-600">
            Experience personalized, real-time insights for effective diabetes care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};