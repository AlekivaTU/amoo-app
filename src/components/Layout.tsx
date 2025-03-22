import React from 'react';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <div className="content">
        {children}
      </div>
      <BottomNav />
    </div>
  );
};

export default Layout; 