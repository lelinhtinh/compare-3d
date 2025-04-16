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
  editingProduct?: Product | null;
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
  onRemove: (index: string) => void;
  onEdit: (index: string) => void;
}

export interface PreviewProps {
  products: Product[];
}

export interface UniqolorOptions {
  format?: 'rgb' | 'hsl' | 'hex';
  saturation?: number | number[];
  lightness?: number | number[];
  differencePoint?: number;
}

export type Theme = 'dark' | 'light' | 'system';

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export interface SettingProps {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}
