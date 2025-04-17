import { NuqsAdapter } from 'nuqs/adapters/react';
import Workspace from './App';
import { ModeToggle } from './components/ModeToggle';
import { ThemeProvider } from './contexts/ThemeProvider';
import './index.css';

export default function Layout() {
  return (
    <NuqsAdapter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Workspace />
        <nav className="absolute top-4 right-4">
          <ModeToggle />
        </nav>
      </ThemeProvider>
    </NuqsAdapter>
  );
}
