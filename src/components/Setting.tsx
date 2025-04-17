import { description, repository, version } from '@/../package.json';
import { Product, SettingProps } from '@/common/types';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Separator } from '@radix-ui/react-separator';
import gh from 'github-url-from-git';
import { Github } from 'lucide-react';
import { useState } from 'react';
import { ProductForm } from './ProductForm';
import SortableItem from './SortableItem';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import logo from '/logo.svg?url';

export function Setting({ products, setProducts }: SettingProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  function handleRemove(idx: string) {
    setProducts(products.filter((p) => p.name !== idx));
  }

  function handleEdit(idx: string) {
    const product = products.find((p) => p.name === idx);
    if (product) {
      setEditingProduct({ ...product, idx });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = products.findIndex((p) => p.name === active.id);
    const newIndex = products.findIndex((p) => p.name === over.id);
    setProducts(arrayMove(products, oldIndex, newIndex));
  }

  function handleClear() {
    setProducts([]);
    setEditingProduct(null);
  }

  return (
    <section className="min-w-sm">
      <div className="p-8">
        <header className="flex items-stretch mb-4">
          <Avatar
            className="w-14 size-14 mr-4 cursor-no-drop"
            onClick={handleClear}
          >
            <AvatarImage src={logo} alt="3d" />
            <AvatarFallback>3d</AvatarFallback>
          </Avatar>
          <div className="grow content-center">
            <div className="flex items-center flex-row gap-2">
              <h1 className="font-semibold">Compare 3D</h1>
              <Badge variant="secondary">v{version}</Badge>
              <a
                href={gh(repository.url)}
                target="_blank"
                rel="noopener noreferrer"
                className={navigator.onLine ? 'ml-auto' : ' hidden'}
                aria-label="Star on GitHub"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full cursor-pointer"
                >
                  <Github />
                </Button>
              </a>
            </div>
            <h4 className="tracking-tight text-gray-400">{description}</h4>
          </div>
        </header>
        <section>
          <ProductForm
            products={products}
            setProducts={setProducts}
            editingProduct={editingProduct}
          />
        </section>
      </div>
      <Separator />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={products.map((p) => p.name)}>
          <ul>
            {products.map((p) => (
              <SortableItem
                key={p.name}
                product={p}
                onRemove={handleRemove}
                onEdit={() => handleEdit(p.name)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </section>
  );
}
