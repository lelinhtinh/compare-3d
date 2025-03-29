import { Product } from '@/common/types';

export function getExistingNames(products: Product[], currentIdx?: string) {
  if (currentIdx) {
    products = products.filter((product) => product.idx !== currentIdx);
  }
  return products.map((product) => product.name);
}
