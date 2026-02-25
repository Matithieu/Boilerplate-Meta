import { makeStyles } from '@/theme/makeStyles'
import * as React from 'react'

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

const useStyles = makeStyles<{ variant: BadgeVariant }>()(
  (theme, { variant }) => ({
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: theme.radius.md,
      border: '1px solid transparent',
      paddingLeft: '0.625rem',
      paddingRight: '0.625rem',
      paddingTop: '0.125rem',
      paddingBottom: '0.125rem',
      fontSize: '0.75rem',
      fontWeight: 600,
      transition: 'background-color 0.15s ease, color 0.15s ease',
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${theme.colors.ring}`,
      },
      ...(variant === 'default' && {
        borderColor: 'transparent',
        backgroundColor: theme.colors.primary,
        color: theme.colors.primaryForeground,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        '&:hover': { backgroundColor: theme.colors.primaryAlpha80 },
      }),
      ...(variant === 'secondary' && {
        borderColor: 'transparent',
        backgroundColor: theme.colors.secondary,
        color: theme.colors.secondaryForeground,
        '&:hover': { backgroundColor: theme.colors.mutedAlpha50 },
      }),
      ...(variant === 'destructive' && {
        borderColor: 'transparent',
        backgroundColor: theme.colors.destructive,
        color: theme.colors.destructiveForeground,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        '&:hover': { backgroundColor: theme.colors.destructiveAlpha80 },
      }),
      ...(variant === 'outline' && {
        borderColor: theme.colors.border,
        color: theme.colors.foreground,
      }),
    },
  }),
)

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const { classes, cx } = useStyles({ variant })
  return <div className={cx(classes.badge, className)} {...props} />
}

export { Badge }
