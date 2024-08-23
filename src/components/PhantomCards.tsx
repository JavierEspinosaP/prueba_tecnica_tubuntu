import React from "react";

const PhantomCards: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center">
      {/* Render the specified number of phantom cards */}
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          data-testid="phantom-card"
          className="bg-gray-300 p-8 rounded-lg shadow-lg flex flex-col items-center text-center min-w-[300px] basis-[300px] animate-pulse"
        >
          <div className="h-32 w-32 bg-gray-400 rounded-full mb-6"></div>
          <div className="h-8 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-400 rounded w-1/2 mb-6"></div>
          <div className="w-32 border-b border-gray-400 my-6 mx-auto"></div>
          <div className="h-6 bg-gray-400 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-400 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-400 rounded w-full mb-4"></div>
        </div>
      ))}
    </div>
  );
};

export default PhantomCards;
