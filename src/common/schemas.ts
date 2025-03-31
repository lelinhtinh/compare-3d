import { z } from 'zod';
import { UnitEnum } from './types';

export const productSchema = z.object({
  idx: z.string().trim().optional(),
  name: z
    .string()
    .min(1, 'Name is required')
    .trim()
    .refine(
      (val) => {
        return !/[,;'"?#@&=+*%():![\]{}|\\^$]/.test(val);
      },
      () => ({ message: 'Name contains special characters' })
    ),
  width: z.number().positive('Width must be positive').nullable(),
  height: z.number().positive('Height must be positive').nullable(),
  length: z.number().positive('Length must be positive').nullable(),
  unit: z.nativeEnum(UnitEnum).default(UnitEnum.mm),
  color: z.string().optional(),
  sortable: z.boolean().default(false),
});
