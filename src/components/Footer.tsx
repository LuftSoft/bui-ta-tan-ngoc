import { Github, Linkedin, Mail, X } from "lucide-react";
import React from "react";
import { Constants } from "../utils/const";

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/LuftSoft", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/tan-ngoc/",
      label: "LinkedIn",
    },
    { icon: X, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:tanngoc.dev@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{Constants.HERO_TITLE}</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
            Full Stack Developer passionate about developing responsive and
            high-performance web applications.
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                aria-label={link.label}
                className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors duration-200"
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Tan Ngoc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
