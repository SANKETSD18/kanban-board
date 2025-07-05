import React from 'react';


const Card = ({ title, description, status, priority, color  }) => {
  const colorClasses = {
    red: 'bg-red-100 border-red-500',
    yellow: 'bg-yellow-100 border-yellow-500',
    green: 'bg-green-100 border-green-500',
  };
  
  return (
    <>
      <div className={`bg-gray-100 text-black p-4 rounded-lg shadow-md space-y-2 ${colorClasses[color] || 'bg-white'}`} >
        <h3 className="text-lg font-semibold text-purple-700">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
        <div className="flex justify-between text-sm mt-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {status}
          </span>
          <span
            className={`px-2 py-1 rounded-full ${priority === 'High'
              ? 'bg-red-100 text-red-700'
              : priority === 'Medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700'
              }`}
          >
            {priority}
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
