import { Dispatch, SetStateAction } from 'react';
import { z } from 'zod';
import { productSchema } from './schemas';

export type Position = [number, number, number];

export enum UnitEnum {
  mm = 'mm',
  cm = 'cm',
  inch = 'inch',
}

export type Product = z.infer<typeof productSchema>;

export interface ProductFormProps {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export interface ProductBoxProps {
  product: Product;
  position: Position;
  scaleFactor: number;
}

export interface PreviewProps {
  products: Product[];
}

export interface SortableItemProps {
  product: Product;
  index: number;
  onRemove: (index: number) => void;
}

export interface PreviewProps {
  products: Product[];
}
