import { makeStyles } from '@/theme/makeStyles'
import * as React from 'react'

const useStyles = makeStyles()((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    height: '2.5rem',
    width: '2.5rem',
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: '9999px',
  },
  image: {
    aspectRatio: '1 / 1',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  fallback: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    backgroundColor: theme.colors.muted,
  },
}))

const Avatar = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { classes, cx } = useStyles()
  return (
    <div className={cx(classes.root, className)} {...props}>
      {children}
    </div>
  )
}

const AvatarImage = ({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { classes, cx } = useStyles()
  return <img className={cx(classes.image, className)} {...props} />
}

const AvatarFallback = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { classes, cx } = useStyles()
  return <div className={cx(classes.fallback, className)} {...props} />
}

export { Avatar, AvatarImage, AvatarFallback }
