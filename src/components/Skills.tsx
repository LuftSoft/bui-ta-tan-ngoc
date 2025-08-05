import {
  Cloud,
  Code,
  Database,
  Globe,
  Palette,
  Server,
  Smartphone,
} from "lucide-react";
import React from "react";

const Skills: React.FC = () => {
  const techStack = [
    {
      category: "Frontend",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      technologies: [
        {
          name: "React",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/fe/react.svg",
        },
        {
          name: "Next.js",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/fe/nextjs.svg",
        },
        {
          name: "Angular",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/fe/angular.svg",
        },
        {
          name: "TypeScript",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/fe/typescript.svg",
        },
        {
          name: "Zod",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/fe/zod.svg",
        },
        {
          name: "Eslint",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/fe/eslint.svg",
        },
      ],
    },
    {
      category: "Backend",
      icon: Server,
      color: "from-green-500 to-emerald-500",
      technologies: [
        {
          name: "Express.js",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/be/expressjs.svg",
        },
        {
          name: "ASP.NET API",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/be/netapi.svg",
        },
        {
          name: "Spring boot",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/be/springboot.svg",
        },
        {
          name: "Prisma",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/be/prisma.svg",
        },
        {
          name: "REST APIs",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/be/restapi.svg",
        },
        {
          name: "JWT",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/be/jwt.svg",
        },
      ],
    },
    {
      category: "Database",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      technologies: [
        {
          name: "MSSQL",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/db/mssql.svg",
        },
        {
          name: "MySQL",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/db/mysql.svg",
        },
        {
          name: "MongoDB",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/db/mongodb.svg",
        },
        {
          name: "Redis",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/db/redis.svg",
        },
      ],
    },
    {
      category: "Mobile",
      icon: Smartphone,
      color: "from-orange-500 to-red-500",
      technologies: [
        {
          name: "React Native",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/mobile/react_native.svg",
        },
        // { name: "Flutter", icon: "🦋" },
        // { name: "Expo", icon: "⭕" },
        // { name: "iOS", icon: "🍎" },
        // { name: "Android", icon: "🤖" },
        // { name: "PWA", icon: "📲" },
      ],
    },
    {
      category: "DevOps & Tools",
      icon: Cloud,
      color: "from-indigo-500 to-blue-500",
      technologies: [
        {
          name: "Docker",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/cicd/docker.svg",
        },
        {
          name: "GitHub Actions",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/cicd/github_actions.svg",
        },
        // { name: "Linux", icon: "🐧" },
        // { name: "AWS", icon: "☁️" },
        // { name: "Vercel", icon: "▲" },
        // { name: "Netlify", icon: "🌐" },
        // { name: "Nginx", icon: "🔧" },
        // { name: "Kubernetes", icon: "☸️" },
      ],
    },
    {
      category: "Design & Others",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      technologies: [
        {
          name: "Figma",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/others/figma.svg",
        },
        {
          name: "Git",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/others/git.svg",
        },
        {
          name: "GitHub",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/others/github.svg",
        },
        {
          name: "Postman",
          icon: "https://github.com/LuftSoft/bui-ta-tan-ngoc/tree/master/dist/assets/tech_stack_icon/others/postman.svg",
        },
        // { name: "Adobe XD", icon: "🔷" },
        // { name: "Webpack", icon: "📦" },
        // { name: "Vite", icon: "⚡" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Stack & Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Technologies and tools I use to build amazing digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${category.color} text-white rounded-xl mr-4`}
                >
                  <category.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.category}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {category.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105"
                  >
                    <img
                      src={tech.icon}
                      alt="tech_icon"
                      className="w-8 ratio-1/1 mr-3"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
            <Code size={20} className="mr-2" />
            <span className="font-medium">
              Always learning new technologies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
