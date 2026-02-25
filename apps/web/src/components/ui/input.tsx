import { makeStyles } from '@/theme/makeStyles'
import * as React from 'react'

const useStyles = makeStyles()((theme) => ({
  input: {
    display: 'flex',
    height: '2.25rem',
    width: '100%',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.input}`,
    backgroundColor: 'transparent',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    fontSize: '1rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    outline: 'none',
    color: theme.colors.foreground,
    '&::file-selector-button': {
      border: 0,
      background: 'transparent',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.colors.foreground,
    },
    '&::placeholder': {
      color: theme.colors.mutedForeground,
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 1px ${theme.colors.ring}`,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    [theme.bp.md]: {
      fontSize: '0.875rem',
    },
  },
}))

const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) => {
  const { classes, cx } = useStyles()
  return (
    <input className={cx(classes.input, className)} type={type} {...props} />
  )
}

export { Input }
