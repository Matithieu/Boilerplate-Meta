import { makeStyles } from '@/theme/makeStyles'
import * as React from 'react'

const useStyles = makeStyles()(() => ({
  root: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1,
    '&:has([disabled])': {
      cursor: 'not-allowed',
      opacity: 0.7,
    },
  },
}))

const Label = ({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  const { classes, cx } = useStyles()
  return <label className={cx(classes.root, className)} {...props} />
}

export { Label }
