import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import gh from 'github-url-from-git';
import { Github } from 'lucide-react';
import { parseAsArrayOf, useQueryState } from 'nuqs';
import { useState } from 'react';
import { description, repository, version } from '../package.json';
import { productSchema } from './common/schemas';
import { Product } from './common/types';
import { ModeToggle } from './components/ModeToggle';
import Preview from './components/Preview';
import { ProductForm } from './components/ProductForm';
import SortableItem from './components/SortableItem';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { ThemeProvider } from './contexts/ThemeProvider';
import { parseAsBase64 } from './utils/parseAsBase64';
import logo from '/logo.svg?url';

export default function App() {
  const [products, setProducts] = useQueryState(
    'data',
    parseAsArrayOf(parseAsBase64(productSchema.parse), ';')
      .withDefault([])
      .withOptions({ history: 'push' })
  );
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
    setProducts(null);
    setEditingProduct(null);
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ResizablePanelGroup direction="horizontal" className="size-full">
        <ResizablePanel defaultSize={25}>
          <div className="min-w-sm h-full overflow-x-hidden overflow-y-auto">
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
                  <h4 className="tracking-tight text-gray-400">
                    {description}
                  </h4>
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
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
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
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <Preview products={products} />
        </ResizablePanel>
      </ResizablePanelGroup>
      <nav className="absolute top-4 right-4">
        <ModeToggle />
      </nav>
    </ThemeProvider>
  );
}
