import { SortableItemProps } from '@/common/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, SquarePen, X } from 'lucide-react';
import { Button } from './ui/button';

function SortableItem({ product, onEdit, onRemove }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    color: product.color,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex justify-between items-center p-2 border-b"
    >
      <div className="relative">
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab absolute left-0"
        >
          <GripVertical />
        </span>
        <span className="ml-8">
          {product.name} - {product.width}x{product.height}x{product.length}{' '}
          {product.unit}
        </span>
      </div>
      <span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEdit(product.name)}
          className="cursor-pointer hover:text-blue-700 mx-4"
          aria-label="Edit product"
        >
          <SquarePen />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onRemove(product.name)}
          className="cursor-pointer hover:text-red-700"
          aria-label="Remove product"
        >
          <X />
        </Button>
      </span>
    </li>
  );
}

export default SortableItem;
