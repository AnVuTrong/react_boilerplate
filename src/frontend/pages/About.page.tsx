import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.context';

const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="prose max-w-none">
      <h1 className="text-3xl font-bold text-primary mb-6">
        {language === 'en' ? 'About Us' : 'Về chúng tôi'}
      </h1>
      <p className="mb-4">
        {language === 'en'
          ? 'We are a team of passionate developers building modern web applications.'
          : 'Chúng tôi là một nhóm các nhà phát triển đam mê xây dựng các ứng dụng web hiện đại.'}
      </p>
    </div>
  );
};

export default AboutPage; 