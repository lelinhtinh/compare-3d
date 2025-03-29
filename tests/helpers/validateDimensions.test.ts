/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateDimensions } from '@/helpers/validateDimensions';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockForm = {
  setError: vi.fn(),
};

describe('validateDimensions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return false and set error if a dimension is missing', () => {
    const product = { width: null, height: 10, length: 20 };
    const result = validateDimensions(mockForm as any, product as any);
    expect(result).toBe(false);
    expect(mockForm.setError).toHaveBeenCalledWith('width', {
      type: 'manual',
      message: 'Width is required',
    });
  });

  it('should return true if all dimensions are present', () => {
    const product = { width: 10, height: 20, length: 30 };
    const result = validateDimensions(mockForm as any, product as any);
    expect(result).toBe(true);
    expect(mockForm.setError).not.toHaveBeenCalled();
  });
});
