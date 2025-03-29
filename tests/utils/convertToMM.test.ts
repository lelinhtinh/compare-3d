import { UnitEnum } from '@/common/types';
import { convertToMM } from '@/utils/convertToMM';
import { describe, expect, it } from 'vitest';

describe('convertToMM', () => {
  it('should return 0 when value is 0', () => {
    expect(convertToMM(0, UnitEnum.mm)).toBe(0);
  });

  it('should return the same value when unit is mm', () => {
    expect(convertToMM(10, UnitEnum.mm)).toBe(10);
  });

  it('should correctly convert cm to mm', () => {
    expect(convertToMM(1, UnitEnum.cm)).toBe(10);
  });

  it('should use default value and unit when no arguments are provided', () => {
    expect(convertToMM()).toBe(0);
  });

  it('should handle negative values correctly', () => {
    expect(convertToMM(-5, UnitEnum.cm)).toBe(-50);
  });
});
