import { motion } from 'framer-motion';
import { Rocket, Eye } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-600 to-emerald-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
      
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6 bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-2"
          >
            🌟 Transforming Diabetes Care – Join Us!
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AI-Powered Diabetes Management
            <span className="block text-emerald-300">Personalized, Real-Time Insights.</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-emerald-100">
            Manage your diabetes with ease – anytime, anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#newsletter"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Rocket className="w-5 h-5" />
              Get Early Access
            </motion.a>
            
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 border-2 border-white/20 hover:bg-green-600/30 transition-all"
            >
              <Eye className="w-5 h-5" />
              Discover More
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20"
        >
          <div className="relative max-w-md mx-auto">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
              alt="Pokidoc App Interface"
              className="rounded-2xl shadow-2xl"
            />
            
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.02, 0.98, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg"
            >
              <span className="text-lg font-bold">Coming Soon! 🎉</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};