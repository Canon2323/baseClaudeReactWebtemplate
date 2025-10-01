// Tipos para sistema de temas extensível
export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  // Cores customizadas podem ser adicionadas
  [key: string]: string;
}

export interface ThemeSpacing {
  radius: string;
  // Spacing customizado pode ser adicionado
  [key: string]: string;
}

export interface CustomTheme {
  id: string;
  name: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  spacing?: ThemeSpacing;
  css?: string; // CSS customizado adicional
  fonts?: {
    sans?: string[];
    serif?: string[];
    mono?: string[];
  };
}

export interface ThemeConfig {
  defaultTheme: string;
  enableSystem: boolean;
  themes: CustomTheme[];
  storageKey?: string;
  attribute?: string;
}

export interface ThemeContextType {
  currentTheme: string;
  availableThemes: CustomTheme[];
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  systemTheme: "light" | "dark" | undefined;
  resolvedTheme: string;
  // Registro de novos temas (Open/Closed Principle)
  registerTheme: (theme: CustomTheme) => void;
  unregisterTheme: (themeId: string) => void;
  // Customização em tempo real
  updateThemeColors: (
    themeId: string,
    mode: "light" | "dark",
    colors: Partial<ThemeColors>,
  ) => void;
}

// Factory para criar temas predefinidos
export type ThemePreset =
  | "default"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "violet"
  | "slate";

export interface CreateThemeOptions {
  preset?: ThemePreset;
  customColors?: {
    light?: Partial<ThemeColors>;
    dark?: Partial<ThemeColors>;
  };
  customSpacing?: Partial<ThemeSpacing>;
  customFonts?: {
    sans?: string[];
    serif?: string[];
    mono?: string[];
  };
}
