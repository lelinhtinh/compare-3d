import { SortableItemProps } from '@/common/types';
import { Separator } from '@/components/ui/separator';
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
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab absolute left-0"
        >
          <GripVertical />
        </div>
        <div className="ml-8 flex h-5 items-center space-x-4 text-sm">
          <strong>{product.name}</strong>
          <Separator orientation="vertical" />
          <span className="text-gray-500">
            {product.width}x{product.height}x{product.length} {product.unit}
          </span>
        </div>
      </div>
      <div className="text-nowrap">
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
      </div>
    </li>
  );
}

export default SortableItem;
