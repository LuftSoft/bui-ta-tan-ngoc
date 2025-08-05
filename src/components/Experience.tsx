import React, { useState } from "react";
import { Calendar, Users, Code, Target, ChevronRight } from "lucide-react";

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const experiences = [
    {
      company: "ISV Viet Nam",
      position: "Fullstack Developer",
      period: "JUL 2024 - NOW",
      duration: "1+ years",
      status: "Previous",
      projectDescription: "Vehicle management system",
      teamSize: 5,
      techStack: ["Next.js", "Prisma", "MySQL", "Zod", "React Hook Form"],
      responsibilities: [
        "Implement new features as requested by customers.",
        "Improve application performance.",
        "Maintain and reduce bugs.",
        "Collaborate with cross-functional teams.",
      ],
      achievements: [
        "Reduced application load time, search time, and data processing time.",
        "Successfully delivered 15+ customer-requested features.",
      ],
    },
    {
      company: "Bosch Global Software Technologies Vietnam",
      position: "Angular Intern Developer",
      period: "JUN 2023 - DEC 2023",
      duration: "6 months",
      status: "Previous",
      projectDescription: "Department CMS",
      teamSize: 7,
      techStack: ["Angular", "Angular Material", "Spring Boot", "MySQL"],
      responsibilities: [
        "Develop responsive user interfaces.",
        "Implement state management solutions.",
        "Optimize web performance.",
        "Collaborate with UX/UI designers.",
      ],
      achievements: [
        "Successfully implemented a new feature that improved user engagement by 30%.",
      ],
    },
    {
      company: "TMA Solutions",
      position: "Intern Web Developer",
      period: "MAR 2023 - JUN 2023",
      duration: "3 months",
      status: "Previous",
      projectDescription: "Device management system",
      teamSize: 2,
      techStack: ["Angular", "Angular Material", "ASP.NET API", "MSSQL Server"],
      responsibilities: [
        "Develop application UI interfaces",
        "Develop RESTful APIs",
        "Debug and fix application issues",
        "Learn and adapt the technologies",
      ],
      achievements: [
        "Successfully completed the requirements of the project.",
        "Fixed bugs and improved application performance.",
        "Learned and applied new technologies effectively.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            My professional journey and contributions to various organizations
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Company Tabs */}
          <div className="lg:w-1/3">
            <div className="space-y-2">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    activeTab === index
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.company}</h3>
                      <p
                        className={`text-sm ${
                          activeTab === index
                            ? "text-blue-100"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {exp.position}
                      </p>
                      <div className="flex items-center mt-2">
                        <Calendar size={14} className="mr-1" />
                        <span
                          className={`text-xs ${
                            activeTab === index
                              ? "text-blue-100"
                              : "text-gray-400"
                          }`}
                        >
                          {exp.duration}
                        </span>
                        {exp.status === "Current" && (
                          <span
                            className={`ml-2 px-2 py-1 text-xs rounded-full ${
                              activeTab === index
                                ? "bg-green-500 text-white"
                                : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                            }`}
                          >
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className={`transition-transform duration-200 ${
                        activeTab === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience Details */}
          <div className="lg:w-2/3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`${activeTab === index ? "block" : "hidden"}`}
                >
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {exp.position}
                      </h3>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {exp.period}
                      </span>
                    </div>
                    <h4 className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      {exp.company}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {exp.projectDescription}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Team Size
                        </span>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {exp.teamSize} members
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Duration
                        </span>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {exp.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Code className="w-5 h-5 text-blue-600 mr-2" />
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Tech Stack
                      </h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Target className="w-5 h-5 text-blue-600 mr-2" />
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Key Responsibilities
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((responsibility, respIndex) => (
                        <li key={respIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-300">
                            {responsibility}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-300">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
