import { makeStyles } from '@/theme/makeStyles'
import * as React from 'react'

const useStyles = makeStyles()((theme) => ({
  card: {
    borderRadius: theme.radius.xl,
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.card,
    color: theme.colors.cardForeground,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    padding: '1.5rem',
  },
  title: {
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '-0.025em',
  },
  description: {
    fontSize: '0.875rem',
    color: theme.colors.mutedForeground,
  },
  content: {
    padding: '1.5rem',
    paddingTop: 0,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem',
    paddingTop: 0,
  },
}))

const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { classes, cx } = useStyles()
  return <div className={cx(classes.card, className)} {...props} />
}

const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { classes, cx } = useStyles()
  return <div className={cx(classes.header, className)} {...props} />
}

const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { classes, cx } = useStyles()
  return <div className={cx(classes.title, className)} {...props} />
}

const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { classes, cx } = useStyles()
  return <div className={cx(classes.description, className)} {...props} />
}

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { classes, cx } = useStyles()
  return <div className={cx(classes.content, className)} {...props} />
}

const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { classes, cx } = useStyles()
  return <div className={cx(classes.footer, className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
