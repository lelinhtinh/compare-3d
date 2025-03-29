import { Product, UnitEnum } from '@/common/types';
import { ProductForm } from '@/components/ProductForm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const mockSetProducts = vi.fn();

describe('ProductForm', () => {
  beforeEach(() => {
    mockSetProducts.mockClear();
  });

  it('should render the form fields correctly', async () => {
    const { getByPlaceholder, getByText } = render(
      <ProductForm
        products={[]}
        setProducts={mockSetProducts}
        editingProduct={null}
      />
    );

    await expect
      .element(getByPlaceholder('Enter a unique name'))
      .toBeInTheDocument();
    await expect.element(getByPlaceholder('Width')).toBeInTheDocument();
    await expect.element(getByPlaceholder('Height')).toBeInTheDocument();
    await expect.element(getByPlaceholder('Length')).toBeInTheDocument();
    await expect.element(getByText('Submit')).toBeInTheDocument();
  });

  it('should call setProducts with a new product on form submission', async () => {
    const { getByPlaceholder, getByText } = render(
      <ProductForm
        products={[]}
        setProducts={mockSetProducts}
        editingProduct={null}
      />
    );

    await getByPlaceholder('Enter a unique name').fill('Test Product');
    await getByPlaceholder('Width').fill('100');
    await getByPlaceholder('Height').fill('50');
    await getByPlaceholder('Length').fill('200');
    await getByText('Submit').click();

    expect(mockSetProducts).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should reset the form after submission', async () => {
    const { getByPlaceholder, getByText } = render(
      <ProductForm
        products={[]}
        setProducts={mockSetProducts}
        editingProduct={null}
      />
    );

    await getByPlaceholder('Enter a unique name').fill('Test Product');
    await getByPlaceholder('Width').fill('100');
    await getByPlaceholder('Height').fill('50');
    await getByPlaceholder('Length').fill('200');
    await getByText('Submit').click();

    await expect
      .element(getByPlaceholder('Enter a unique name'))
      .toHaveValue('');
  });

  it('should populate fields when editing a product', async () => {
    const editingProduct: Product = {
      idx: 'Test Product',
      name: 'Test Product',
      width: 100,
      height: 50,
      length: 200,
      unit: UnitEnum.mm,
      sortable: false,
      color: '#000000',
    };

    const { getByPlaceholder } = render(
      <ProductForm
        products={[editingProduct]}
        setProducts={mockSetProducts}
        editingProduct={editingProduct}
      />
    );

    await expect
      .element(getByPlaceholder('Enter a unique name'))
      .toHaveValue(editingProduct.name);
  });

  it('should validate dimensions before submission', async () => {
    const { getByText } = render(
      <ProductForm
        products={[]}
        setProducts={mockSetProducts}
        editingProduct={null}
      />
    );

    await getByText('Submit').click();

    expect(mockSetProducts).not.toHaveBeenCalled();
    await expect.element(getByText('Name is required')).toBeInTheDocument();
  });
});
