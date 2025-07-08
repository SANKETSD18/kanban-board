// DroppableColumn.jsx
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from './SortableCard';

const DroppableColumn = ({ id, title, tasks, color, onEdit, onDelete}) => {
    const { setNodeRef } = useDroppable({
    id, // e.g., "todo"
    data: {
      column: id, // 👈 required for newColumn to work
    },
  });

  return (
    <div ref={setNodeRef} className="flex-1 bg-white rounded-lg shadow-lg">
      <div className="p-4 space-y-4 min-h-[200px]">
        <h2 className="text-xl text-center font-semibold text-black mb-2">{title}</h2>
        <div >
          <SortableContext
            id={`column-${id}`}
            items={tasks.map(task => task._id)}           // 🔁 Ye bata raha kaunse items sort ho sakte
            strategy={verticalListSortingStrategy}        // 🧭 Ye order strategy hai (vertical list)
          >


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



          </SortableContext>
        </div>

      </div>

    </div>
  );
};

export default DroppableColumn;
