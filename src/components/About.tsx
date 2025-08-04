import React from 'react';
import { Download, Award, Users, Coffee } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Award, label: 'Years Experience', value: '5+' },
    { icon: Users, label: 'Happy Clients', value: '50+' },
    { icon: Coffee, label: 'Projects Completed', value: '100+' },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate developer with a love for creating exceptional digital experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
                alt="Profile"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Creating Digital Solutions That Matter
            </h3>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                With over 5 years of experience in web development, I specialize in creating 
                modern, scalable applications using cutting-edge technologies. My journey began 
                with a passion for problem-solving and has evolved into expertise across the 
                full development stack.
              </p>
              
              <p>
                I believe in writing clean, maintainable code and creating user experiences 
                that are both functional and delightful. When I'm not coding, you can find me 
                exploring new technologies, contributing to open-source projects, or sharing 
                knowledge with the developer community.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 my-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg mb-3">
                    <stat.icon size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Download size={20} className="mr-2" />
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;