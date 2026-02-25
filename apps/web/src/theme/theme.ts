// Helper function to convert HSL CSS variable to actual color
const hsl = (variable: string) => `hsl(var(${variable}))`
const hslAlpha = (variable: string, alpha: number) =>
  `hsl(var(${variable}) / ${alpha})`

export const theme = {
  // Layout constants
  layout: {
    headerHeight: '52px',
    sidebarWidth: '220px',
  },

  // Breakpoints for responsive design
  bp: {
    xs: '@media (min-width: 480px)',
    sm: '@media (min-width: 640px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1280px)',
    '2xl': '@media (min-width: 1536px)',
  },

  // Colors based on CSS variables
  colors: {
    background: hsl('--background'),
    foreground: hsl('--foreground'),

    card: hsl('--card'),
    cardForeground: hsl('--card-foreground'),

    popover: hsl('--popover'),
    popoverForeground: hsl('--popover-foreground'),

    primary: hsl('--primary'),
    primaryForeground: hsl('--primary-foreground'),
    primaryAlpha10: hslAlpha('--primary', 0.1),
    primaryAlpha70: hslAlpha('--primary', 0.7),
    primaryAlpha80: hslAlpha('--primary', 0.8),
    primaryAlpha90: hslAlpha('--primary', 0.9),

    secondary: hsl('--secondary'),
    secondaryForeground: hsl('--secondary-foreground'),

    muted: hsl('--muted'),
    mutedForeground: hsl('--muted-foreground'),
    mutedAlpha50: hslAlpha('--muted', 0.5),

    accent: hsl('--accent'),
    accentForeground: hsl('--accent-foreground'),

    destructive: hsl('--destructive'),
    destructiveForeground: hsl('--destructive-foreground'),
    destructiveAlpha80: hslAlpha('--destructive', 0.8),
    destructiveAlpha90: hslAlpha('--destructive', 0.9),

    border: hsl('--border'),
    input: hsl('--input'),
    ring: hsl('--ring'),
  },

  // Border radius
  radius: {
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
    xl: 'calc(var(--radius) + 4px)',
  },

  // Spacing scale (rem-based)
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },

  // Font sizes
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 1px 3px rgba(0,0,0,0.1)',
    lg: '0 4px 6px rgba(0,0,0,0.1)',
    xl: '0 10px 15px rgba(0,0,0,0.1)',
  },

  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
} as const
