import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/navigation.components/Header.component';
import Footer from '../components/navigation.components/Footer.component';
import { LanguageProvider } from '../contexts/LanguageContext.context';

const MainLayout: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default MainLayout; 