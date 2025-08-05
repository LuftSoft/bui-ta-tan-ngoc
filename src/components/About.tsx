import { Award, Coffee, Download } from "lucide-react";
import React from "react";
import { Constants } from "../utils/const";

const About: React.FC = () => {
  const now = new Date();
  const stats = [
    {
      icon: Award,
      value: `${now.getFullYear() - Constants.START_CAREER_YEAR}+`,
      label: "Years Experience",
    },
    { icon: Coffee, value: "5+", label: "Projects Completed" },
  ];
  const aboutInfo = {
    name: "Bùi Tá Tân Ngọc",
    description:
      "Passionate developer with a love for creating innovative solutions and a commitment to excellence.",
    objective: "Resolve to create impactful software solutions.",
    experience: `With about ${
      now.getFullYear() - Constants.START_CAREER_YEAR
    } years of experience in developing responsive and
                high-performance web applications. Proficient in both frontend
                and backend development, with a solid understanding of RESTful
                APIs, component-based architecture, and server-side rendering.
                Passionate about writing clean, maintainable code and
                continuously improving product quality.`,
    commited: `I believe in writing clean, maintainable code and creating user
                experiences that are both functional and delightful.`,
  };

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {aboutInfo.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative">
              <img
                src="https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/avatar.jpg"
                alt="Profile"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {aboutInfo.objective}
            </h3>

            <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="text-justify">{aboutInfo.experience}</p>
              <p className="text-justify">{aboutInfo.commited}</p>
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
            <div className="my-12"></div>
            <a
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
              href="https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/resume/CV_Bui_Ta_Tan_Ngoc.pdf"
              download="CV_Bui_Ta_Tan_Ngoc.pdf"
            >
              <Download size={20} className="mr-2" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
