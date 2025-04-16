import { Cog } from 'lucide-react';
import { parseAsArrayOf, useQueryState } from 'nuqs';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { productSchema } from './common/schemas';
import Preview from './components/Preview';
import { Setting } from './components/Setting';
import { Button } from './components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from './components/ui/drawer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './components/ui/resizable';
import { parseProductAsTuple } from './helpers/parseProductAsTuple';

export default function App() {
  const [products, setProducts] = useQueryState(
    'data',
    parseAsArrayOf(parseProductAsTuple(productSchema.parse), ';')
      .withDefault([])
      .withOptions({ history: 'push' })
  );

  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <ResizablePanelGroup direction="horizontal" className="size-full">
        <ResizablePanel defaultSize={25}>
          <div className="h-full overflow-x-hidden overflow-y-auto">
            <Setting products={products} setProducts={setProducts} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <Preview products={products} />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }

  return (
    <div className="size-full">
      <Preview products={products} />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <nav className="absolute top-4 left-4">
            <Button variant="outline" size="icon">
              <Cog />
            </Button>
          </nav>
        </DrawerTrigger>
        <DrawerContent>
          <div className="overflow-y-auto">
            <Setting products={products} setProducts={setProducts} />
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
