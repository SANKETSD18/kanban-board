// DroppableColumn.jsx
import { useDroppable } from '@dnd-kit/core';
import SortableCard from './SortableCard';

const DroppableColumn = ({ id, title, tasks, color, onEdit, onDelete }) => {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      column: id, // 👈 यह होना चाहिए
    },
  });

  return (
    <div ref={setNodeRef} className="flex-1 bg-white rounded-lg shadow-lg">
      <div className="p-4 space-y-4 min-h-[200px]">
        <h2 className="text-xl text-center font-semibold text-black mb-2">{title}</h2>

        {tasks.map((task) => (
          <SortableCard
            key={task._id}
            id={task._id}
            task={task}
            color={color}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default DroppableColumn;
