import { Product, UnitEnum } from '@/common/types';
import { Setting } from '@/components/Setting';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const productA = {
  idx: 'Product A',
  name: 'Product A',
  width: 10,
  height: 20,
  length: 30,
  unit: UnitEnum.mm,
  sortable: false,
  color: '#ff0000',
};
const productB = {
  idx: 'Product B',
  name: 'Product B',
  width: 40,
  height: 50,
  length: 60,
  unit: UnitEnum.mm,
  sortable: false,
  color: '#00ff00',
};
const sampleProducts: Product[] = [productA, productB];
const mockSetProducts = vi.fn();

describe('Setting', () => {
  beforeEach(() => {
    mockSetProducts.mockClear();
  });

  it('renders Setting with products', async () => {
    const { getByText } = render(
      <Setting products={sampleProducts} setProducts={mockSetProducts} />
    );
    await expect.element(getByText(productA.name)).toBeInTheDocument();
    await expect.element(getByText(productB.name)).toBeInTheDocument();
  });

  it('removes a product when handleRemove is called', async () => {
    const { getByLabelText } = render(
      <Setting products={sampleProducts} setProducts={mockSetProducts} />
    );
    const removeBtnA = getByLabelText('Remove product').first();
    await removeBtnA.click();
    expect(mockSetProducts).toHaveBeenCalledWith([productB]);
  });

  it('edits a product when handleEdit is called', async () => {
    const { getByLabelText, getByPlaceholder } = render(
      <Setting products={sampleProducts} setProducts={mockSetProducts} />
    );
    const editBtnA = getByLabelText('Edit product').first();
    await editBtnA.click();
    await expect
      .element(getByPlaceholder('Enter a unique name'))
      .toHaveValue(productA.name);
  });

  it('clears all products when avatar is clicked', async () => {
    const { getByAltText } = render(
      <Setting products={sampleProducts} setProducts={mockSetProducts} />
    );
    await getByAltText('3d').click();
    expect(mockSetProducts).toHaveBeenCalledWith([]);
  });
});
