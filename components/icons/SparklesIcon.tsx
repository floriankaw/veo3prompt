import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813 2.846a4.5 4.5 0 012.188 2.188L24 13.375l-2.75.813a4.5 4.5 0 01-2.188 2.188L16.25 19.25l-.813-2.846a4.5 4.5 0 01-2.188-2.188L10.5 13.375l2.75-.813a4.5 4.5 0 012.188-2.188L18.25 7.5z" />
  </svg>
);

export default SparklesIcon;
