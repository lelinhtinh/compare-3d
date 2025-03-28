import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { parseAsArrayOf, parseAsJson, useQueryState } from 'nuqs';
import Preview from './components/Preview';
import { ProductForm } from './components/ProductForm';
import SortableItem from './components/SortableItem';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { productSchema } from './schemas';

export default function App() {
  const [products, setProducts] = useQueryState(
    'data',
    parseAsArrayOf(parseAsJson(productSchema.parse)).withDefault([])
  );

  function handleRemove(index: number) {
    setProducts(products.filter((_, i) => i !== index));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = products.findIndex((p) => p.name === active.id);
    const newIndex = products.findIndex((p) => p.name === over.id);
    setProducts(arrayMove(products, oldIndex, newIndex));
  }

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/3 p-4 bg-gray-100">
        <Card className="mb-8">
          <CardHeader className="flex items-stretch">
            <Avatar className="w-14 size-14 mr-4">
              <AvatarImage src="/logo.svg" alt="3d" />
              <AvatarFallback>3d</AvatarFallback>
            </Avatar>
            <div className="size-14 grow content-center">
              <CardTitle>Compare 3D</CardTitle>
              <CardDescription>
                Compare the dimensions of products easily.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ProductForm products={products} setProducts={setProducts} />
          </CardContent>
        </Card>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={products.map((p) => p.name)}>
            <ul>
              {products.map((p, idx) => (
                <SortableItem
                  key={p.name}
                  product={p}
                  index={idx}
                  onRemove={handleRemove}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
      <div className="w-2/3 h-full">
        <Preview products={products} />
      </div>
    </div>
  );
}
