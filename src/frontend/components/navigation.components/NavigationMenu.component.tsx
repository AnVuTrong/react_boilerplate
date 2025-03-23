import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../constants/Navigation.constant';
import { useLanguage } from '../../contexts/LanguageContext.context';

interface NavigationMenuProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isMobile = false, onItemClick }) => {
  const { language } = useLanguage();
  
  return (
    <nav className={`${isMobile ? 'flex flex-col space-y-2' : 'flex items-center space-x-6'}`}>
      {NAVIGATION_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => 
            `flex items-center px-2 py-1 transition-colors duration-200 ${
              isActive 
                ? 'text-primary font-semibold'
                : 'text-text-secondary hover:text-primary'
            }`
          }
          onClick={onItemClick}
        >
          {item.icon && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
            </svg>
          )}
          <span>{item.label[language]}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationMenu; 