import React from 'react';

const Likes: React.FC<{ likesCount: number }> = ({ likesCount }) => (
  <button className="flex items-center">
    {/* Thumbs Up Icon */}
    <svg 
      className="h-5 w-5 mr-1 text-gray-600" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    > 
      {/* ... (thumbs up icon path) ... */}
    </svg>

    <span>{likesCount}</span>
  </button>
);
