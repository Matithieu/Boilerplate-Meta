import { makeStyles } from '@/theme/makeStyles'
import { Button as BaseUiButton } from '@base-ui/react/button'
import { FC } from 'react'

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    whiteSpace: 'nowrap',
    borderRadius: theme.radius.md,
    border: 'none',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: theme.fontWeight.medium,
    fontFamily: 'inherit',
    lineHeight: 1.25,
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: theme.colors.primary,
    color: theme.colors.primaryForeground,
    transition: `opacity ${theme.transitions.fast}`,
    '&:hover': {
      opacity: 0.9,
    },
    '&:active': {
      opacity: 0.8,
    },
    '&[disabled]': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.ring}`,
      outlineOffset: '2px',
    },
  },
}))

type ButtonProps = React.ComponentPropsWithoutRef<typeof BaseUiButton>

const Button: FC<ButtonProps> = ({ className, ...props }) => {
  const { cx, classes } = useStyles()

  const mergedClassName: ButtonProps['className'] =
    typeof className === 'function'
      ? (state) => cx(classes.root, className(state))
      : cx(classes.root, className)

  return <BaseUiButton className={mergedClassName} {...props} />
}

export default Button
