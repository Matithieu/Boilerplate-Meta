import { makeStyles } from '@/theme/makeStyles'
import { Menu } from 'lucide-react'
import { FC } from 'react'

import { toggleSidebar } from '../layout.util'

const useStyles = makeStyles()((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    width: '100vw',
    height: 'var(--Header-height)',
    zIndex: 2000,
    padding: '0.5rem',
    gap: '0.25rem',
    borderBottom: `1px solid ${theme.colors.border}`,
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    backgroundColor: theme.colors.card,
    [theme.bp.md]: { display: 'none' },
  },
  menuButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.input}`,
    backgroundColor: theme.colors.background,
    padding: '0.375rem',
    cursor: 'pointer',
    color: theme.colors.foreground,
    '&:hover': {
      backgroundColor: theme.colors.accent,
      color: theme.colors.accentForeground,
    },
  },
}))

const HeaderLayout: FC = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.header}>
      <button className={classes.menuButton} onClick={() => toggleSidebar()}>
        <Menu style={{ height: '1.25rem', width: '1.25rem' }} />
      </button>
    </div>
  )
}

export default HeaderLayout
