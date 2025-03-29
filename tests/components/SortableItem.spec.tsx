import { Product, UnitEnum } from '@/common/types';
import SortableItem from '@/components/SortableItem';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const product: Product = {
  idx: 'Test Product',
  name: 'Test Product',
  width: 100,
  height: 50,
  length: 200,
  unit: UnitEnum.mm,
  sortable: false,
  color: '#000000',
};

const mockOnEdit = vi.fn();
const mockOnRemove = vi.fn();

describe('SortableItem', () => {
  beforeEach(() => {
    mockOnEdit.mockClear();
    mockOnRemove.mockClear();
  });

  it('renders correctly with product details', async () => {
    const { getByLabelText, getByText } = render(
      <SortableItem
        product={product}
        onEdit={mockOnEdit}
        onRemove={mockOnRemove}
      />
    );

    await expect.element(getByText('Test Product')).toBeInTheDocument();
    await expect.element(getByText('100x50x200 mm')).toBeInTheDocument();
    await expect.element(getByLabelText('Edit product')).toBeInTheDocument();
    await expect.element(getByLabelText('Remove product')).toBeInTheDocument();
  });

  it('calls onEdit when the edit button is clicked', async () => {
    const { getByLabelText } = render(
      <SortableItem
        product={product}
        onEdit={mockOnEdit}
        onRemove={mockOnRemove}
      />
    );

    await getByLabelText('Edit product').click();
    expect(mockOnEdit).toHaveBeenCalledWith('Test Product');
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onRemove when the remove button is clicked', async () => {
    const { getByLabelText } = render(
      <SortableItem
        product={product}
        onEdit={mockOnEdit}
        onRemove={mockOnRemove}
      />
    );

    await getByLabelText('Remove product').click();
    expect(mockOnRemove).toHaveBeenCalledWith('Test Product');
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});
