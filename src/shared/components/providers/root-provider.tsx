'use client';

import { ThemeProvider } from './theme-provider';

interface RootProviderProps {
  children: React.ReactNode;
}

/**
 * Root provider that wraps all other providers
 * Following the Composite pattern for provider composition
 */
export function RootProvider({ children }: RootProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}