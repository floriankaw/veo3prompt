
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, text, className, ...props }) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center px-3 py-1.5 border border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors duration-150 ${className}`}
      {...props}
    >
      {icon}
      {text && <span className="ml-2">{text}</span>}
    </button>
  );
};

export default IconButton;