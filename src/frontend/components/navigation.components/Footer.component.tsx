import React from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../constants/Navigation.constant';
import { useLanguage } from '../../contexts/LanguageContext.context';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary text-text-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-primary font-bold mb-4">React Boilerplate</h3>
            <p className="mb-4">
              A modern, scalable React boilerplate with multilanguage support.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-primary font-bold mb-4">
              {language === 'en' ? 'Quick Links' : 'Liên kết nhanh'}
            </h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-primary transition-colors duration-200">
                    {item.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary font-bold mb-4">
              {language === 'en' ? 'Contact Us' : 'Liên hệ'}
            </h3>
            <p className="mb-2">Email: info@example.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center">
          <p>© {currentYear} React Boilerplate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 