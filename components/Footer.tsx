import React from 'react';

interface FooterProps {
  text: string;
}

const Footer: React.FC<FooterProps> = ({ text }) => {
  const currentYear = new Date().getFullYear();
  const footerText = text.replace('{year}', currentYear.toString());

  return (
    <footer className="bg-gray-800/50 border-t border-gray-700/50 mt-12 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-sm text-gray-400">
          {footerText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
