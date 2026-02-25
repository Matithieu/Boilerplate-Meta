import { makeStyles } from '@/theme/makeStyles'
import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'

const useStyles = makeStyles()((theme) => ({
  item: {
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  header: {
    display: 'flex',
  },
  trigger: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all 0.15s ease',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    color: theme.colors.foreground,
    '&:hover': {
      textDecoration: 'underline',
    },
    '&[data-panel-open] > svg': {
      transform: 'rotate(180deg)',
    },
  },
  chevron: {
    width: '1rem',
    height: '1rem',
    flexShrink: 0,
    color: theme.colors.mutedForeground,
    transition: 'transform 0.2s ease',
  },
  content: {
    overflow: 'hidden',
    fontSize: '0.875rem',
    '&[data-closed]': {
      animation: `0.2s ease-out`,
    },
    '&[data-open]': {
      animation: `0.2s ease-out`,
    },
  },
  contentInner: {
    paddingBottom: '1rem',
    paddingTop: 0,
  },
}))

const Accordion = BaseAccordion.Root

const AccordionItem = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAccordion.Item>) => {
  const { classes, cx } = useStyles()
  return (
    <BaseAccordion.Item
      className={cx(
        classes.item,
        typeof className === 'string' ? className : undefined,
      )}
      {...props}
    />
  )
}

const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>) => {
  const { classes, cx } = useStyles()
  return (
    <BaseAccordion.Header className={classes.header}>
      <BaseAccordion.Trigger
        className={cx(
          classes.trigger,
          typeof className === 'string' ? className : undefined,
        )}
        {...props}
      >
        {children}
        <ChevronDown className={classes.chevron} />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}

const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel>) => {
  const { classes, cx } = useStyles()
  return (
    <BaseAccordion.Panel className={classes.content} {...props}>
      <div
        className={cx(
          classes.contentInner,
          typeof className === 'string' ? className : undefined,
        )}
      >
        {children}
      </div>
    </BaseAccordion.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
