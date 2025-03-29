import { generateColor } from '@/helpers/generateColor';
import { describe, expect, it } from 'vitest';

describe('generateColor', () => {
  it('should generate a valid dark color', () => {
    const existingColors: string[] = [];
    const newColor = generateColor(existingColors);
    expect(newColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('should generate a color distinct from existing colors', () => {
    const existingColors = ['#123456', '#654321'];
    const newColor = generateColor(existingColors);
    expect(existingColors).not.toContain(newColor);
  });

  it('should still generate a color if max attempts are reached', () => {
    const existingColors = Array.from(
      { length: 100 },
      (_, i) => `#${(i + 1).toString(16).padStart(6, '0')}`
    );
    const newColor = generateColor(existingColors);
    expect(newColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });
});
