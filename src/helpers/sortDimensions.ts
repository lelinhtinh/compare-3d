import { Product } from '@/common/types';

export function sortDimensions(values: Product): void {
  const dimensions = [values.width!, values.height!, values.length!].sort(
    (a, b) => a - b
  );
  [values.width, values.length, values.height] = dimensions;
}
