import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-200 dark:border-indigo-900 animate-spin border-t-indigo-500"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-purple-200 dark:border-purple-900 animate-spin border-t-purple-500 animation-delay-150"></div>
    </div>
  </div>
);