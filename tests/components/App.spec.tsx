/* eslint-disable @typescript-eslint/no-explicit-any */
import { description } from '@/../package.json';
import App from '@/App';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

vi.mock('nuqs', () => {
  return {
    parseAsArrayOf: () => ({
      withDefault: (defaultValue: any) => ({
        withOptions: () => defaultValue,
      }),
    }),
    createParser: (obj: any) => obj,
    parseAsBase64: (schema: any) => schema,
    useQueryState: (_key: string, parser: any) => {
      const [state, setState] = useState(parser);
      return [state, setState];
    },
  };
});

describe('App', () => {
  it('renders the App component in mobile size', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (query) => ({
      matches: query === '(min-width: 768px)' ? false : true,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
    const { container } = render(<App />);
    expect(container.querySelector('.lucide.lucide-cog')).toBeInTheDocument();
    window.matchMedia = originalMatchMedia;
  });

  it('renders header with title and subtitle', async () => {
    const { getByText } = render(<App />);
    await expect.element(getByText('Compare 3D')).toBeInTheDocument();
    await expect.element(getByText(description)).toBeInTheDocument();
  });

  it('renders Preview component with a canvas', async () => {
    const { container } = render(<App />);
    const canvasElement = container.querySelector('canvas');
    expect(canvasElement).toBeInTheDocument();
  });

  it('should CRUD the product successfully', async () => {
    const { getByText, getByPlaceholder, getByLabelText } = render(<App />);

    // Create
    await getByPlaceholder('Enter a unique name').fill('Test Product');
    await getByPlaceholder('Width').fill('100');
    await getByPlaceholder('Height').fill('50');
    await getByPlaceholder('Length').fill('200');
    await getByText('Submit').click();

    await expect
      .element(getByPlaceholder('Enter a unique name'))
      .toHaveValue('');
    await expect.element(getByText('Test Product')).toBeInTheDocument();
    await expect.element(getByText('100x50x200 mm')).toBeInTheDocument();
    await expect.element(getByLabelText('Edit product')).toBeInTheDocument();
    await expect.element(getByLabelText('Remove product')).toBeInTheDocument();

    // Edit
    await getByLabelText('Edit product').click();
    await expect
      .element(getByPlaceholder('Enter a unique name'))
      .toHaveValue('Test Product');
    await getByPlaceholder('Enter a unique name').fill('Modified Product');
    await getByLabelText('Sort dimensions').click();
    await getByText('Submit').click();

    await expect.element(getByText('Modified Product')).toBeInTheDocument();
    await expect.element(getByText('50x200x100 mm')).toBeInTheDocument();

    // Remove
    await getByLabelText('Remove product').click();
    await expect.element(getByText('Modified Product')).not.toBeInTheDocument();
  });
});
