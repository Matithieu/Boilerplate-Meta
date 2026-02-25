import { fadeIn, fadeOut, slideInFromBottom } from '@/theme/animations'
import { makeStyles } from '@/theme/makeStyles'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import * as React from 'react'

type SheetSide = 'top' | 'bottom' | 'left' | 'right'

const useStyles = makeStyles<{ side: SheetSide }>()((theme, { side }) => ({
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    '&[data-state="open"]': { animation: `${fadeIn} 0.15s ease` },
    '&[data-state="closed"]': { animation: `${fadeOut} 0.3s ease` },
  },
  content: {
    position: 'fixed',
    zIndex: 50,
    gap: '1rem',
    backgroundColor: theme.colors.background,
    padding: '1.5rem',
    boxShadow:
      '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease-in-out',
    '&[data-state="open"]': {
      ...(side === 'top' && { animation: `0.5s ease` }),
      ...(side === 'bottom' && { animation: `${slideInFromBottom} 0.5s ease` }),
      ...(side === 'left' && { animation: `0.5s ease` }),
      ...(side === 'right' && { animation: `0.5s ease` }),
    },
    '&[data-state="closed"]': {
      ...(side === 'top' && { animation: `0.3s ease` }),
      ...(side === 'bottom' && { animation: `0.3s ease` }),
      ...(side === 'left' && { animation: `0.3s ease` }),
      ...(side === 'right' && { animation: `0.3s ease` }),
    },
    ...(side === 'top' && {
      inset: '0 0 auto 0',
      borderBottom: `1px solid ${theme.colors.border}`,
    }),
    ...(side === 'bottom' && {
      inset: 'auto 0 0 0',
      borderTop: `1px solid ${theme.colors.border}`,
    }),
    ...(side === 'left' && {
      inset: '0 auto 0 0',
      height: '100%',
      width: '75%',
      maxWidth: '24rem',
      borderRight: `1px solid ${theme.colors.border}`,
    }),
    ...(side === 'right' && {
      inset: '0 0 0 auto',
      height: '100%',
      width: '75%',
      maxWidth: '24rem',
      borderLeft: `1px solid ${theme.colors.border}`,
    }),
  },
  closeButton: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    borderRadius: '0.125rem',
    opacity: 0.7,
    transition: 'opacity 0.15s ease',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: theme.colors.foreground,
    '&:hover': { opacity: 1 },
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.colors.ring}`,
    },
    '&:disabled': { pointerEvents: 'none' },
    '&[data-state="open"]': { backgroundColor: theme.colors.secondary },
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    textAlign: 'center',
    [theme.bp.sm]: { textAlign: 'left' },
  },
  footer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    [theme.bp.sm]: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: '0.5rem',
    },
  },
  title: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: theme.colors.foreground,
  },
  description: {
    fontSize: '0.875rem',
    color: theme.colors.mutedForeground,
  },
}))

const Sheet = BaseDialog.Root

const SheetTrigger = BaseDialog.Trigger

const SheetPortal = BaseDialog.Portal

const SheetBackdrop = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>) => {
  const { classes, cx } = useStyles({ side: 'right' })
  return (
    <BaseDialog.Backdrop
      className={cx(
        classes.overlay,
        typeof className === 'string' ? className : undefined,
      )}
      {...props}
    />
  )
}

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseDialog.Popup> {
  side?: SheetSide
}

const SheetContent = ({
  side = 'right',
  className,
  children,
  ...props
}: SheetContentProps) => {
  const { classes, cx } = useStyles({ side })
  return (
    <SheetPortal>
      <SheetBackdrop />
      <BaseDialog.Popup
        className={cx(
          classes.content,
          typeof className === 'string' ? className : undefined,
        )}
        {...props}
      >
        <BaseDialog.Close className={classes.closeButton}>
          <X style={{ width: '1rem', height: '1rem' }} />
          <span
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
              clip: 'rect(0,0,0,0)',
            }}
          >
            Close
          </span>
        </BaseDialog.Close>
        {children}
      </BaseDialog.Popup>
    </SheetPortal>
  )
}

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { classes, cx } = useStyles({ side: 'right' })
  return <div className={cx(classes.header, className)} {...props} />
}

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { classes, cx } = useStyles({ side: 'right' })
  return <div className={cx(classes.footer, className)} {...props} />
}

const SheetTitle = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Title>) => {
  const { classes, cx } = useStyles({ side: 'right' })
  return (
    <BaseDialog.Title
      className={cx(
        classes.title,
        typeof className === 'string' ? className : undefined,
      )}
      {...props}
    />
  )
}

const SheetDescription = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Description>) => {
  const { classes, cx } = useStyles({ side: 'right' })
  return (
    <BaseDialog.Description
      className={cx(
        classes.description,
        typeof className === 'string' ? className : undefined,
      )}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
