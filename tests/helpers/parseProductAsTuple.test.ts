import { Product, UnitEnum } from '@/common/types';
import { parseProductAsTuple } from '@/helpers/parseProductAsTuple';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockRuntimeParser = vi.fn((value) => value as Product);
const parser = parseProductAsTuple(mockRuntimeParser);

describe('parseProductAsTuple', () => {
  beforeEach(() => {
    mockRuntimeParser.mockClear();
  });

  describe('parse', () => {
    it('should return null for empty query', () => {
      expect(parser.parse('')).toBeNull();
      expect(mockRuntimeParser).not.toHaveBeenCalled();
    });

    it('should return null if any required field is missing', () => {
      expect(parser.parse('1,test')).toBeNull();
      expect(mockRuntimeParser).not.toHaveBeenCalled();
    });

    it('should correctly parse a valid query string', () => {
      const query = '1,Product,10,20,30,cm,red,true';
      const expectedProduct: Product = {
        idx: '1',
        name: 'Product',
        width: 10,
        height: 20,
        length: 30,
        unit: UnitEnum.cm,
        color: 'red',
        sortable: true,
      };

      parser.parse(query);
      expect(mockRuntimeParser).toHaveBeenCalledWith(expectedProduct);
    });

    it('should handle numeric values that fail to parse', () => {
      const query = '1,Product,invalid,20,30,cm,red,true';
      const expectedProduct: Product = {
        idx: '1',
        name: 'Product',
        width: null,
        height: 20,
        length: 30,
        unit: UnitEnum.cm,
        color: 'red',
        sortable: true,
      };

      parser.parse(query);
      expect(mockRuntimeParser).toHaveBeenCalledWith(expectedProduct);
    });

    it('should handle false for sortable', () => {
      const query = '1,Product,10,20,30,cm,red,false';
      const expectedProduct: Product = {
        idx: '1',
        name: 'Product',
        width: 10,
        height: 20,
        length: 30,
        unit: UnitEnum.cm,
        color: 'red',
        sortable: false,
      };

      parser.parse(query);
      expect(mockRuntimeParser).toHaveBeenCalledWith(expectedProduct);
    });

    it('should return null if parser throws an error', () => {
      mockRuntimeParser.mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const query = '1,Product,10,20,30,cm,red,true';
      expect(parser.parse(query)).toBeNull();
    });
  });

  describe('serialize', () => {
    it('should correctly serialize a product object', () => {
      const product: Product = {
        idx: '1',
        name: 'Product',
        width: 10,
        height: 20,
        length: 30,
        unit: UnitEnum.cm,
        color: 'red',
        sortable: true,
      };

      const expectedQuery = '1,Product,10,20,30,cm,red,true';
      expect(parser.serialize(product)).toEqual(expectedQuery);
    });

    it('should handle null dimension values', () => {
      const product: Product = {
        idx: '1',
        name: 'Product',
        width: null,
        height: null,
        length: null,
        unit: UnitEnum.cm,
        color: 'red',
        sortable: false,
      };

      const expectedQuery = '1,Product,,,,cm,red,false';
      expect(parser.serialize(product)).toEqual(expectedQuery);
      expect(parser.parse(expectedQuery)).toBeNull();
    });
  });

  describe('eq', () => {
    it('should return true for equal products', () => {
      const product1: Product = {
        idx: '1',
        name: 'Product',
        width: 10,
        height: 20,
        length: 30,
        unit: UnitEnum.cm,
        color: 'red',
        sortable: true,
      };

      const product2: Product = {
        idx: '1',
        name: 'Product',
        width: 10,
        height: 20,
        length: 30,
        unit: UnitEnum.cm,
        color: 'red',
        sortable: true,
      };

      expect(parser.eq(product1, product2)).toBe(true);
    });

    it('should return false for different products', () => {
      const product1: Product = {
        idx: '1',
        name: 'Product',
        width: 10,
        height: 20,
        length: 30,
        unit: UnitEnum.cm,
        color: 'red',
        sortable: true,
      };

      const product2: Product = {
        idx: '2',
        name: 'Product',
        width: 10,
        height: 20,
        length: 30,
        unit: UnitEnum.cm,
        color: 'red',
        sortable: true,
      };

      expect(parser.eq(product1, product2)).toBe(false);
    });
  });
});
