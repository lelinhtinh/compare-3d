import { createParser } from 'nuqs';
import { base64ToString, stringToBase64 } from 'uint8array-extras';

export function parseAsBase64<T>(runtimeParser: (value: unknown) => T) {
  return createParser({
    parse: (query) => {
      try {
        const obj = JSON.parse(base64ToString(query));
        return runtimeParser(obj);
      } catch (_error) {
        return null;
      }
    },
    serialize: (value) =>
      stringToBase64(JSON.stringify(value), { urlSafe: true }),
    eq(a, b) {
      const serializedA = this.serialize(a);
      const serializedB = this.serialize(b);
      return serializedA === serializedB;
    },
  });
}
