/* eslint-disable @typescript-eslint/no-explicit-any */
import { calculateSceneParameters } from '@/helpers/calculateSceneParameters';
import { describe, expect, it } from 'vitest';

describe('calculateSceneParameters', () => {
  it('should return default values when no products are provided', () => {
    const result = calculateSceneParameters([]);
    expect(result).toEqual({ scaleFactor: 1, positions: [] });
  });

  it('should calculate correct scaleFactor and positions for a single product', () => {
    const products: any[] = [
      { width: 100, height: 50, length: 200, unit: 'mm' },
    ];
    const result = calculateSceneParameters(products);

    expect(result.scaleFactor).toBeGreaterThan(0);
    expect(result.positions.length).toBe(1);
    expect(result.positions[0]).toEqual(
      expect.arrayContaining([expect.any(Number)])
    );
  });

  it('should calculate correct scaleFactor and positions for multiple products', () => {
    const products: any[] = [
      { width: 100, height: 50, length: 200, unit: 'mm' },
      { width: 150, height: 75, length: 250, unit: 'mm' },
    ];
    const result = calculateSceneParameters(products);

    expect(result.scaleFactor).toBeGreaterThan(0);
    expect(result.positions.length).toBe(2);
    expect(result.positions[0]).toEqual(
      expect.arrayContaining([expect.any(Number)])
    );
    expect(result.positions[1]).toEqual(
      expect.arrayContaining([expect.any(Number)])
    );
  });

  it('should handle products with different units', () => {
    const products: any[] = [
      { width: 10, height: 5, length: 20, unit: 'cm' },
      { width: 1, height: 0.5, length: 2, unit: 'inch' },
    ];
    const result = calculateSceneParameters(products);

    expect(result.scaleFactor).toBeGreaterThan(0);
    expect(result.positions.length).toBe(2);
  });
});
