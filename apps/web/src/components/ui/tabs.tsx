import { makeStyles } from '@/theme/makeStyles'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import * as React from 'react'

const useStyles = makeStyles()((theme) => ({
  list: {
    display: 'inline-flex',
    height: '2.25rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.muted,
    padding: '0.25rem',
    color: theme.colors.mutedForeground,
  },
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    borderRadius: theme.radius.md,
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all 0.15s ease',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'inherit',
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.colors.ring}`,
    },
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    '&[data-selected]': {
      backgroundColor: theme.colors.background,
      color: theme.colors.foreground,
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
  },
  content: {
    marginTop: '0.5rem',
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.colors.ring}`,
    },
  },
}))

const Tabs = BaseTabs.Root

const TabsList = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.List>) => {
  const { classes, cx } = useStyles()
  return (
    <BaseTabs.List
      className={cx(
        classes.list,
        typeof className === 'string' ? className : undefined,
      )}
      {...props}
    />
  )
}

const TabsTrigger = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>) => {
  const { classes, cx } = useStyles()
  return (
    <BaseTabs.Tab
      className={cx(
        classes.trigger,
        typeof className === 'string' ? className : undefined,
      )}
      {...props}
    />
  )
}

const TabsContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>) => {
  const { classes, cx } = useStyles()
  return (
    <BaseTabs.Panel
      className={cx(
        classes.content,
        typeof className === 'string' ? className : undefined,
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
