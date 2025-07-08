import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Card = ({ color, onEdit, onDelete, task }) => {
  const colorClasses = {
    red: 'bg-red-50 border-red-400',
    yellow: 'bg-yellow-100 border-yellow-500',
    green: 'bg-green-100 border-green-500',
  };

  return (
    <div
      className={`bg-gray-100 text-black p-4 rounded-lg shadow-md space-y-2 border-l-4 ${colorClasses[color] || 'bg-white'}`}
    >
      <h3 className="text-lg font-semibold text-purple-700">{task.title}</h3>
      <p className="text-sm text-gray-700">{task.description}</p>

      <div className="flex justify-between text-sm mt-2">
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          {task.status}
        </span>
        <span
          className={`px-2 py-1 rounded-full ${task.priority === 'High'
            ? 'bg-red-100 text-red-700'
            : task.priority === 'Medium'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
            }`}
        >
          {task.priority}
        </span>
      </div>

      {/* ✅ Move Buttons Here */}
      <div className="flex justify-end gap-2 mt-3">
        <button
           onClick={() => onEdit(task)}
          className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
        >
          {/* <FaEdit /> */}
           ✏️Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
        >
          {/* <FaTrash /> */}
           🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
