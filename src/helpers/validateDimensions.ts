import { Product } from '@/common/types';
import { UseFormReturn } from 'react-hook-form';

export function validateDimensions(
  form: UseFormReturn<Product>,
  values: Product
): boolean {
  const dimensionFields = ['width', 'height', 'length'] as const;
  for (const field of dimensionFields) {
    if (!values[field]) {
      form.setError(field, {
        type: 'manual',
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`,
      });
      return false;
    }
  }
  return true;
}
