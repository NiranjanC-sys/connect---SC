import React, { useState, useEffect } from 'react';
import { Users, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const [onlineDoctors, setOnlineDoctors] = useState(127);
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineDoctors(prev => Math.floor(Math.random() * (150 - 120) + 120));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleConsultNow = () => {
    navigate('/hello'); // Redirects to the /hello route
  };

  return (
    <div className="bg-gradient-to-r from-violet-50 to-violet-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 space-y-6 animate-slide-left">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-poppins">
            Skip the travel!
            <br />
            <span className="text-blue-600">Take Online Doctor Consultation</span>
          </h1>
          <p className="text-xl text-gray-600 font-inter">
            Private consultation + Audio call · Starts at just ₹199
          </p>
          
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
              ))}
            </div>
            <span className="text-green-600 font-medium">+{onlineDoctors} Doctors are online</span>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl"
            onClick={handleConsultNow}
          >
            Consult Now
          </button>

          <div className="flex space-x-6 pt-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Verified Doctors</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Digital Prescription</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 mt-8 lg:mt-0 animate-slide-right">
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
            alt="Doctor consultation"
            className="rounded-2xl shadow-2xl transform hover:scale-105 transition-duration-300"
          />
        </div>
      </div>
    </div>
  );
}
