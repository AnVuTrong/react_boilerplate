import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.context';

const HomePage: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="prose max-w-none">
      <h1 className="text-3xl font-bold text-primary mb-6">
        {language === 'en' ? 'Welcome to React Boilerplate' : 'Chào mừng đến với React Boilerplate'}
      </h1>
      <p className="mb-4">
        {language === 'en' 
          ? 'This is a modern, scalable React boilerplate with multilanguage support.'
          : 'Đây là một boilerplate React hiện đại, có khả năng mở rộng với hỗ trợ đa ngôn ngữ.'}
      </p>
    </div>
  );
};

export default HomePage; 