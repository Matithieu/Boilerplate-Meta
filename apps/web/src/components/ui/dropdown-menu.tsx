import { fadeIn, fadeOut, zoomIn95, zoomOut95 } from '@/theme/animations'
import { makeStyles } from '@/theme/makeStyles'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import * as React from 'react'

const useStyles = makeStyles<{ inset?: boolean }>()((theme, { inset }) => ({
  content: {
    zIndex: 50,
    minWidth: '8rem',
    overflow: 'hidden',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.popover,
    padding: '0.25rem',
    color: theme.colors.popoverForeground,
    boxShadow:
      '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    '&[data-open]': {
      animation: `${fadeIn} 0.15s ease, ${zoomIn95} 0.15s ease`,
    },
    '&[data-closed]': {
      animation: `${fadeOut} 0.15s ease, ${zoomOut95} 0.15s ease`,
    },
  },
  item: {
    position: 'relative',
    display: 'flex',
    cursor: 'default',
    userSelect: 'none',
    alignItems: 'center',
    gap: '0.5rem',
    borderRadius: '0.125rem',
    paddingLeft: inset ? '2rem' : '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'background-color 0.15s ease, color 0.15s ease',
    border: 'none',
    background: 'none',
    width: '100%',
    color: theme.colors.foreground,
    '&:focus': {
      backgroundColor: theme.colors.accent,
      color: theme.colors.accentForeground,
    },
    '&[data-disabled]': { pointerEvents: 'none', opacity: 0.5 },
    '& > svg': { width: '1rem', height: '1rem', flexShrink: 0 },
  },
}))

const DropdownMenu = BaseMenu.Root

const DropdownMenuTrigger = BaseMenu.Trigger

interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseMenu.Positioner> {
  sideOffset?: number
}

const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  children,
  ...props
}: DropdownMenuContentProps) => {
  const { classes, cx } = useStyles({})
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={sideOffset} {...props}>
        <BaseMenu.Popup
          className={cx(
            classes.content,
            typeof className === 'string' ? className : undefined,
          )}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof BaseMenu.Item> {
  inset?: boolean
}

const DropdownMenuItem = ({
  className,
  inset,
  ...props
}: DropdownMenuItemProps) => {
  const { classes, cx } = useStyles({ inset })
  return (
    <BaseMenu.Item
      className={cx(
        classes.item,
        typeof className === 'string' ? className : undefined,
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}
