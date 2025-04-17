/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnitEnum } from '@/common/types';
import { extractDimensionsFromClipboard } from '@/helpers/extractDimensionsFromClipboard';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('extractDimensionsFromClipboard', () => {
  const mockForm = {
    setValue: vi.fn(),
  } as unknown as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should extract dimensions with mm unit', () => {
    const clipboardData = '10 x 20 x 30 mm';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(true);
    expect(mockForm.setValue).toHaveBeenCalledWith('width', 10);
    expect(mockForm.setValue).toHaveBeenCalledWith('height', 20);
    expect(mockForm.setValue).toHaveBeenCalledWith('length', 30);
    expect(mockForm.setValue).toHaveBeenCalledWith('unit', UnitEnum.mm);
  });

  it('should extract dimensions with cm unit', () => {
    const clipboardData = '10 x 20 x 30 cm';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(true);
    expect(mockForm.setValue).toHaveBeenCalledWith('width', 10);
    expect(mockForm.setValue).toHaveBeenCalledWith('height', 20);
    expect(mockForm.setValue).toHaveBeenCalledWith('length', 30);
    expect(mockForm.setValue).toHaveBeenCalledWith('unit', UnitEnum.cm);
  });

  it('should extract dimensions with inch unit', () => {
    const clipboardData = '10 x 20 x 30 inches';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(true);
    expect(mockForm.setValue).toHaveBeenCalledWith('width', 10);
    expect(mockForm.setValue).toHaveBeenCalledWith('height', 20);
    expect(mockForm.setValue).toHaveBeenCalledWith('length', 30);
    expect(mockForm.setValue).toHaveBeenCalledWith('unit', UnitEnum.inch);
  });

  it('should handle "inch" as unit', () => {
    const clipboardData = '10 x 20 x 30 inch';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(true);
    expect(mockForm.setValue).toHaveBeenCalledWith('unit', UnitEnum.inch);
  });

  it('should handle "in" as unit', () => {
    const clipboardData = '10 x 20 x 30 in';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(true);
    expect(mockForm.setValue).toHaveBeenCalledWith('unit', UnitEnum.inch);
  });

  it('should handle dimensions without unit', () => {
    const clipboardData = '10 x 20 x 30';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(true);
    expect(mockForm.setValue).toHaveBeenCalledWith('width', 10);
    expect(mockForm.setValue).toHaveBeenCalledWith('height', 20);
    expect(mockForm.setValue).toHaveBeenCalledWith('length', 30);
    expect(mockForm.setValue).not.toHaveBeenCalledWith(
      'unit',
      expect.anything()
    );
  });

  it('should handle dimensions with different separators', () => {
    const clipboardData = '10*20×30';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(true);
    expect(mockForm.setValue).toHaveBeenCalledWith('width', 10);
    expect(mockForm.setValue).toHaveBeenCalledWith('height', 20);
    expect(mockForm.setValue).toHaveBeenCalledWith('length', 30);
  });

  it('should handle dimensions with decimal values using dot', () => {
    const clipboardData = '10.5 x 20.5 x 30.5';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(true);
    expect(mockForm.setValue).toHaveBeenCalledWith('width', 10.5);
    expect(mockForm.setValue).toHaveBeenCalledWith('height', 20.5);
    expect(mockForm.setValue).toHaveBeenCalledWith('length', 30.5);
  });

  it('should handle dimensions with decimal values using comma', () => {
    const clipboardData = '10,5 x 20,5 x 30,5';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(true);
    expect(mockForm.setValue).toHaveBeenCalledWith('width', 10.5);
    expect(mockForm.setValue).toHaveBeenCalledWith('height', 20.5);
    expect(mockForm.setValue).toHaveBeenCalledWith('length', 30.5);
  });

  it('should return false for invalid format', () => {
    const clipboardData = 'invalid format';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(false);
    expect(mockForm.setValue).not.toHaveBeenCalled();
  });

  it('should return false for incomplete dimensions', () => {
    const clipboardData = '10 x 20';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(false);
    expect(mockForm.setValue).not.toHaveBeenCalled();
  });

  it('should return false if any dimension is NaN', () => {
    const clipboardData = '10 x abc x 30';
    const result = extractDimensionsFromClipboard(mockForm, clipboardData);

    expect(result).toBe(false);
    expect(mockForm.setValue).not.toHaveBeenCalled();
  });
});
