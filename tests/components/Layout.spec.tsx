import Layout from '@/Layout';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

describe('Layout', () => {
  it('renders ModeToggle in the navigation', async () => {
    const { getByText } = render(<Layout />);
    await expect.element(getByText('Toggle theme')).toBeInTheDocument();
  });
});
