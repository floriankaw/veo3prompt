import React from 'react';

const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
    // className={`animate-spin ${props.className || ''}`} // Animation handled by Tailwind class on usage
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M3 12H0m16.97-7.97l-2.12 2.12M5.03 16.97l-2.12 2.12M16.97 16.97l-2.12-2.12M5.03 5.03l-2.12-2.12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6a6 6 0 100 12 6 6 0 000-12z" opacity="0.3" />
  </svg>
);

export default SpinnerIcon;