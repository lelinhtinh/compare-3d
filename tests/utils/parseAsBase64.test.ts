import { parseAsBase64 } from '@/utils/parseAsBase64';
import { stringToBase64 } from 'uint8array-extras';
import { describe, expect, it } from 'vitest';

describe('parseAsBase64', () => {
  const personParser = (value: unknown): { name: string } => {
    if (typeof value === 'object' && value !== null && 'name' in value) {
      return { name: (value as { name: string }).name };
    }
    throw new Error('Invalid person');
  };

  const parser = parseAsBase64(personParser);

  describe('parse', () => {
    it('should correctly parse valid base64 encoded JSON', () => {
      const validPerson = { name: 'John' };
      const encoded = stringToBase64(JSON.stringify(validPerson), {
        urlSafe: true,
      });

      const result = parser.parse(encoded);

      expect(result).toEqual(validPerson);
    });

    it('should return null for invalid JSON', () => {
      const invalidJson = stringToBase64('not valid json', { urlSafe: true });

      const result = parser.parse(invalidJson);

      expect(result).toBeNull();
    });

    it('should return null when runtime parser throws', () => {
      const invalidPerson = { age: 25 }; // Missing name property
      const encoded = stringToBase64(JSON.stringify(invalidPerson), {
        urlSafe: true,
      });

      const result = parser.parse(encoded);

      expect(result).toBeNull();
    });
  });

  describe('serialize', () => {
    it('should correctly serialize object to base64', () => {
      const person = { name: 'Jane' };
      const expected = stringToBase64(JSON.stringify(person), {
        urlSafe: true,
      });

      const result = parser.serialize(person);

      expect(result).toEqual(expected);
    });

    it('should produce strings that can be parsed back', () => {
      const original = { name: 'Alice' };

      const serialized = parser.serialize(original);
      const parsed = parser.parse(serialized);

      expect(parsed).toEqual(original);
    });
  });

  describe('eq', () => {
    it('should return true for equivalent objects', () => {
      const a = { name: 'Bob' };
      const b = { name: 'Bob' };

      expect(parser.eq(a, b)).toBe(true);
    });

    it('should return false for different objects', () => {
      const a = { name: 'Bob' };
      const b = { name: 'Alice' };

      expect(parser.eq(a, b)).toBe(false);
    });
  });
});
