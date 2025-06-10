
import React from 'react';

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a7.5 7.5 0 01-3 0m3 0a7.5 7.5 0 00-3 0M12 9.75a2.25 2.25 0 002.25-2.25c0-1.007-.738-1.833-1.72-2.122a6.014 6.014 0 00-1.06 0c-.983.29-1.72 1.115-1.72 2.122A2.25 2.25 0 0012 9.75zM12 18v3.375c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125V18M9.875 18v3.375c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125V18" 
    />
  </svg>
);

export default LightbulbIcon;