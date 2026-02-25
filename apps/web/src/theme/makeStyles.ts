import { createMakeAndWithStyles } from 'tss-react'

import { theme } from './theme'

// Create makeStyles, withStyles, and useStyles hooks with theme support
// Use these for all component styling with type-safe, theme-aware CSS-in-JS
export const { makeStyles } = createMakeAndWithStyles({
  useTheme: () => theme,
})
