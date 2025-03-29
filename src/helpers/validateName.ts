import { Product } from '@/common/types';
import { UseFormReturn } from 'react-hook-form';

export function validateName(
  form: UseFormReturn<Product>,
  values: Product,
  existingNames: string[]
): boolean {
  if (existingNames.includes(values.name)) {
    form.setError('name', {
      type: 'manual',
      message: 'Product name must be unique',
    });
    return false;
  }
  return true;
}
