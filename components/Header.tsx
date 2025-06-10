import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50 ring-1 ring-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src="https://picsum.photos/seed/veopromptdark/40/40?grayscale&invert" 
              alt="Veo Logo" 
              className="h-8 w-8 rounded-full ring-1 ring-gray-700" 
            />
            <h1 className="ml-3 text-2xl font-semibold text-gray-100">{title}</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
