import { NuqsAdapter } from 'nuqs/adapters/react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ModeToggle } from './components/ModeToggle.tsx';
import { ThemeProvider } from './contexts/ThemeProvider.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <NuqsAdapter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <nav className="absolute top-4 right-4">
        <ModeToggle />
      </nav>
    </ThemeProvider>
  </NuqsAdapter>
);
