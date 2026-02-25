import { fadeIn, fadeOut, zoomIn95, zoomOut95 } from '@/theme/animations'
import { makeStyles } from '@/theme/makeStyles'
import { Select as BaseSelect } from '@base-ui/react/select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import * as React from 'react'

const useStyles = makeStyles()((theme) => ({
  trigger: {
    display: 'flex',
    height: '2.25rem',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.input}`,
    backgroundColor: 'transparent',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    fontSize: '0.875rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    outline: 'none',
    color: theme.colors.foreground,
    cursor: 'pointer',
    '&[data-placeholder]': { color: theme.colors.mutedForeground },
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 1px ${theme.colors.ring}`,
    },
    '&:disabled': { cursor: 'not-allowed', opacity: 0.5 },
  },
  scrollButton: {
    display: 'flex',
    cursor: 'default',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
  },
  content: {
    zIndex: 50,
    maxHeight: '20rem',
    minWidth: '8rem',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.popover,
    color: theme.colors.popoverForeground,
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    '&[data-open]': {
      animation: `${fadeIn} 0.15s ease, ${zoomIn95} 0.15s ease`,
    },
    '&[data-closed]': {
      animation: `${fadeOut} 0.15s ease, ${zoomOut95} 0.15s ease`,
    },
  },
  viewport: {
    padding: '0.25rem',
  },
  item: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    cursor: 'default',
    userSelect: 'none',
    alignItems: 'center',
    borderRadius: '0.125rem',
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    paddingLeft: '2rem',
    paddingRight: '0.5rem',
    fontSize: '0.875rem',
    outline: 'none',
    color: theme.colors.foreground,
    '&:focus': {
      backgroundColor: theme.colors.accent,
      color: theme.colors.accentForeground,
    },
    '&[data-disabled]': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },
  itemIndicator: {
    position: 'absolute',
    left: '0.5rem',
    display: 'flex',
    height: '0.875rem',
    width: '0.875rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const Select = BaseSelect.Root

const SelectValue = BaseSelect.Value

const SelectTrigger = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>) => {
  const { classes, cx } = useStyles()
  return (
    <BaseSelect.Trigger
      className={cx(
        classes.trigger,
        typeof className === 'string' ? className : undefined,
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon>
        <ChevronDown style={{ height: '1rem', width: '1rem', opacity: 0.5 }} />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

const SelectScrollUpButton = (
  props: React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollUpArrow>,
) => {
  const { classes } = useStyles()
  return (
    <BaseSelect.ScrollUpArrow className={classes.scrollButton} {...props}>
      <ChevronUp style={{ height: '1rem', width: '1rem' }} />
    </BaseSelect.ScrollUpArrow>
  )
}

const SelectScrollDownButton = (
  props: React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollDownArrow>,
) => {
  const { classes } = useStyles()
  return (
    <BaseSelect.ScrollDownArrow className={classes.scrollButton} {...props}>
      <ChevronDown style={{ height: '1rem', width: '1rem' }} />
    </BaseSelect.ScrollDownArrow>
  )
}

const SelectContent = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>) => {
  const { classes, cx } = useStyles()
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner {...props}>
        <BaseSelect.Popup
          className={cx(
            classes.content,
            typeof className === 'string' ? className : undefined,
          )}
        >
          <SelectScrollUpButton />
          <div className={classes.viewport}>{children}</div>
          <SelectScrollDownButton />
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

const SelectItem = ({
  className,
  children,
  value,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) => {
  const { classes, cx } = useStyles()
  return (
    <div className={cx(classes.item, className)} data-value={value} {...props}>
      <span className={classes.itemIndicator}>
        <Check style={{ height: '1rem', width: '1rem' }} />
      </span>
      {children}
    </div>
  )
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem }
