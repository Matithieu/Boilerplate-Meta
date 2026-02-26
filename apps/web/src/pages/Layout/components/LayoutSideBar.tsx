import { TooltipProvider } from '@/components/ui/tooltip'
import { useAppNavigate } from '@/hooks/useAppNavigate'
import { makeStyles } from '@/theme/makeStyles'
import { theme } from '@/theme/theme'
import { Code2, PanelLeft, PanelLeftClose } from 'lucide-react'
import { FC } from 'react'

import LayoutListItems from './LayoutListItem/LayoutListItems'
import { useSidebarState } from './useSidebarState'

const COLLAPSED_WIDTH = '75px'
const EXPANDED_WIDTH = theme.layout.sidebarWidth

const TRANSITION =
  'width 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)'

// Force sidebar always visible on desktop (overrides the mobile off-screen transform)
const useStyles = makeStyles()((t) => ({
  sidebar: {
    backgroundColor: t.colors.card,
    borderRight: `1px solid ${t.colors.border}`,
    [t.bp.md]: {
      transform: 'translateX(0) !important',
    },
  },
}))

const LayoutSidebar: FC = () => {
  const { classes } = useStyles()
  const { navigation } = useAppNavigate()
  const { isOpen, sidebarRef, handleToggle, handleKeyDown } = useSidebarState()

  const sidebarWidth = isOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH
  const sidebarTransform = isOpen
    ? 'translateX(0)'
    : 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))'

  return (
    <>
      {/* Main sidebar */}
      <aside
        ref={sidebarRef as React.RefObject<HTMLElement>}
        aria-expanded={isOpen}
        aria-label="Main navigation"
        className={classes.sidebar}
        role="navigation"
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'hidden',
          width: sidebarWidth,
          transform: sidebarTransform,
          transition: TRANSITION,
          willChange: 'width, transform',
          paddingTop: '52px',
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            paddingTop: '1rem',
            paddingBottom: '0.5rem',
            paddingRight: '0.75rem',
            paddingLeft: 'calc(37.5px - 1.25rem)',
            overflow: 'hidden',
          }}
        >
          <button
            aria-label="Go to home"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: theme.radius.md,
              background: theme.colors.primaryAlpha10,
              border: 'none',
              cursor: 'pointer',
              color: theme.colors.primary,
            }}
            type="button"
            onClick={() => navigation.toDashboard()}
          >
            <Code2
              aria-hidden="true"
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
          </button>
          <span
            style={{
              fontWeight: 700,
              fontSize: '1rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              opacity: isOpen ? 1 : 0,
              maxWidth: isOpen ? '160px' : '0',
              transition: 'opacity 0.3s ease, max-width 0.35s ease',
              color: theme.colors.foreground,
            }}
          >
            Boilerplate
          </span>
        </div>

        {/* Toggle button — pinned to top-right corner */}
        <button
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          style={{
            position: 'absolute',
            top: '0.5rem',
            left: 'calc(37.5px - 1rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2rem',
            height: '2rem',
            borderRadius: theme.radius.md,
            border: 'none',
            cursor: 'pointer',
            background: 'none',
            color: theme.colors.mutedForeground,
          }}
          type="button"
          onClick={handleToggle}
        >
          {isOpen ? (
            <PanelLeftClose aria-hidden="true" size={16} />
          ) : (
            <PanelLeft aria-hidden="true" size={16} />
          )}
        </button>

        <TooltipProvider>
          <LayoutListItems open={isOpen} />
        </TooltipProvider>
      </aside>
    </>
  )
}

export default LayoutSidebar
