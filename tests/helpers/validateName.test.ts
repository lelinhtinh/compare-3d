/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateName } from '@/helpers/validateName';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockForm = {
  setError: vi.fn(),
};

const existingNames = ['Product A', 'Product B'];

describe('validateName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return false and set error if name is not unique', () => {
    const product = { name: 'Product A' };
    const result = validateName(mockForm as any, product as any, existingNames);
    expect(result).toBe(false);
    expect(mockForm.setError).toHaveBeenCalledWith('name', {
      type: 'manual',
      message: 'Product name must be unique',
    });
  });

  it('should return true if name is unique', () => {
    const product = { name: 'Product C' };
    const result = validateName(mockForm as any, product as any, existingNames);
    expect(result).toBe(true);
    expect(mockForm.setError).not.toHaveBeenCalled();
  });
});
