import React from "react";
import { ExternalLink, Github, Eye } from "lucide-react";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Shop Shoes",
      description:
        "A e-commerce solution with Node.js,Express.js and ejs. Features include user authentication, product management, dashboard for admin to manage the products.",
      image:
        "https://github.com/LuftSoft/QLWEBBH/blob/main/public/img/slider-img/mau-anh-1.jpg?raw=true",
      technologies: [
        "Node.js",
        "Express.js",
        "Ejs",
        "Bootstrap",
        "JQuery",
        "Microsoft SQL Server",
      ],
      liveUrl: "https://github.com/LuftSoft/QLWEBBH/blob/main/README.md",
      githubUrl: "https://github.com/LuftSoft/QLWEBBH/blob/main/README.md",
    },
    {
      title: "Quizz Web App",
      description:
        "A website that allows teachers to create quizz exams from questions in school's library. Students can take exams and view results.",
      image:
        "https://github.com/LuftSoft/bui-ta-tan-ngoc/blob/master/dist/assets/quizz_app.png?raw=true",
      technologies: [
        "React",
        "React Native",
        "MaterialUI",
        "Express.js",
        "MongoDb",
        "Sequelize",
      ],
      liveUrl: "https://github.com/LuftSoft/do-an-cuoi-khoa/tree/master",
      githubUrl: "https://github.com/LuftSoft/do-an-cuoi-khoa/tree/master",
    },
    {
      title: "Mobile Shopping App",
      description:
        "A website that allows users to shop online with a mobile-friendly interface. Features include product browsing, cart management, and order processing.",
      image:
        "https://github.com/LuftSoft/bui-ta-tan-ngoc/blob/master/dist/assets/shop_phone.png?raw=true",
      technologies: [
        "Angular",
        "Angular Material",
        "ASP.NET API",
        "EF Core",
        "Microsoft SQL Server",
      ],
      liveUrl:
        "https://github.com/LuftSoft/do-an-thuc-tap/blob/master/README.md",
      githubUrl:
        "https://github.com/LuftSoft/do-an-thuc-tap/blob/master/README.md",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Side Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my side projects that i created to enhance my skills
            and explore new technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Eye size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              <div className="p-8 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed min-h-32 overflow-hidden text-ellipsis">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors duration-200"
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
