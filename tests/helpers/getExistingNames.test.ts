/* eslint-disable @typescript-eslint/no-explicit-any */
import { getExistingNames } from '@/helpers/getExistingNames';
import { describe, expect, it } from 'vitest';

const products = [
  { idx: 'Product A', name: 'Product A' },
  { idx: 'Product B', name: 'Product B' },
  { idx: 'Product C', name: 'Product C' },
];

describe('getExistingNames', () => {
  it('should return all product names except the current one', () => {
    const result = getExistingNames(products as any, 'Product B');
    expect(result).toEqual(['Product A', 'Product C']);
  });

  it('should return all product names if currentIdx is not provided', () => {
    const result = getExistingNames(products as any);
    expect(result).toEqual(['Product A', 'Product B', 'Product C']);
  });

  it('should return an empty array if products list is empty', () => {
    const result = getExistingNames([]);
    expect(result).toEqual([]);
  });
});
