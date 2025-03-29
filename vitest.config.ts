import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    workspace: [
      {
        extends: true,
        test: {
          include: ['tests/{helpers,utils}/*.test.ts'],
          environment: 'node',
          name: 'node',
        },
      },
      {
        extends: true,
        plugins: [react()],
        test: {
          include: ['tests/**/*.spec.tsx'],
          environment: 'jsdom',
          name: 'jsdom',
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium', headless: true }],
          },
        },
      },
    ],
    coverage: {
      reporter: ['text'],
    },
    typecheck: {
      enabled: true,
    },
  },
});
