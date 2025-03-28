import { SortableItemProps } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import { Button } from './ui/button';

function SortableItem({ product, index, onRemove }: SortableItemProps) {
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
      <span {...attributes} {...listeners} className="cursor-grab">
        <GripVertical />
      </span>
      <span>
        {product.name} - {product.width}x{product.height}x{product.length}{' '}
        {product.unit}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onRemove(index)}
        className="cursor-pointer hover:text-red-700"
        aria-label="Remove product"
      >
        <X />
      </Button>
    </li>
  );
}

export default SortableItem;
