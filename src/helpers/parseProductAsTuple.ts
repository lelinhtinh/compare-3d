import { createParser } from 'nuqs';
import { Product, UnitEnum } from '../common/types';

export function parseProductAsTuple(
  runtimeParser: (value: unknown) => Product
) {
  return createParser({
    parse: (query) => {
      try {
        if (!query) return null;
        const [idx, name, width, height, length, unit, color, sortable] =
          query.split(',');
        if (!idx || !name || !width || !height || !length || !unit || !color)
          return null;
        const obj: Product = {
          idx,
          name,
          width: parseFloat(width) || null,
          height: parseFloat(height) || null,
          length: parseFloat(length) || null,
          unit: unit as UnitEnum,
          color,
          sortable: sortable === 'true',
        };
        return runtimeParser(obj);
      } catch {
        return null;
      }
    },
    serialize: (value: Product) => {
      const { idx, name, width, height, length, unit, color, sortable } = value;
      return [idx, name, width, height, length, unit, color, sortable].join(
        ','
      );
    },
    eq(a, b) {
      const serializedA = this.serialize(a);
      const serializedB = this.serialize(b);
      return serializedA === serializedB;
    },
  });
}
