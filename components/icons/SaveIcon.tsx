
import React from 'react';

// Using a common Save icon (Floppy Disk)
const SaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {/* Floppy disk body */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 3H4.875A2.625 2.625 0 002.25 5.625v12.75c0 1.448 1.177 2.625 2.625 2.625h14.25c1.448 0 2.625-1.177 2.625-2.625V7.5L17.25 3z" />
    {/* Folded corner */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 3v4.5h4.5" />
    {/* Label area on disk */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 15.75h4.5" />
 </svg>
);

export default SaveIcon;
