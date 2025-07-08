// SortableCard.jsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from './Card';

const SortableCard = ({ id, task, color, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}  >
   <div {...listeners} className="cursor-move text-gray-400 text-sm px-2">
        ⠿
      </div>
      <Card task={task} color={color} onEdit={onEdit} onDelete={onDelete} />

    </div>
  );
};

export default SortableCard;
