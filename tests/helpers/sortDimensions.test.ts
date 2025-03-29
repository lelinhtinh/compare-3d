/* eslint-disable @typescript-eslint/no-explicit-any */
import { sortDimensions } from '@/helpers/sortDimensions';
import { describe, expect, it } from 'vitest';

describe('sortDimensions', () => {
  it('should sort width-length-height in ascending order', () => {
    const product = { width: 30, height: 20, length: 10 };
    sortDimensions(product as any);
    expect(product).toEqual({ width: 10, length: 20, height: 30 });
  });
});
