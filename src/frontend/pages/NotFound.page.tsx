import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/Routes.constant';
import { useLanguage } from '../contexts/LanguageContext.context';

const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl mb-8">
        {language === 'en' 
          ? 'Page not found' 
          : 'Không tìm thấy trang'}
      </p>
      <Link 
        to={ROUTES.HOME}
        className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded transition-colors duration-200"
      >
        {language === 'en' ? 'Back to Home' : 'Quay về Trang chủ'}
      </Link>
    </div>
  );
};

export default NotFoundPage; 