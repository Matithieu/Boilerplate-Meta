import { makeStyles } from '@/theme/makeStyles'
import * as React from 'react'

const useStyles = makeStyles<{ orientation: 'horizontal' | 'vertical' }>()(
  (theme, { orientation }) => ({
    root: {
      flexShrink: 0,
      backgroundColor: theme.colors.border,
      ...(orientation === 'horizontal'
        ? { height: '1px', width: '100%' }
        : { height: '100%', width: '1px' }),
    },
  }),
)

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) => {
  const { classes, cx } = useStyles({ orientation })
  return (
    <div
      aria-orientation={orientation}
      className={cx(classes.root, className)}
      role={decorative ? 'none' : 'separator'}
      {...props}
    />
  )
}

export { Separator }
