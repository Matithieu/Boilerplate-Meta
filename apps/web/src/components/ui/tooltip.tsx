import { fadeIn, fadeOut, zoomIn95, zoomOut95 } from '@/theme/animations'
import { makeStyles } from '@/theme/makeStyles'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import * as React from 'react'

const useStyles = makeStyles()((theme) => ({
  content: {
    zIndex: 50,
    overflow: 'hidden',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    fontSize: '0.75rem',
    color: theme.colors.primaryForeground,
    '&[data-state="open"]': {
      animation: `${fadeIn} 0.15s ease, ${zoomIn95} 0.15s ease`,
    },
    '&[data-state="closed"]': {
      animation: `${fadeOut} 0.15s ease, ${zoomOut95} 0.15s ease`,
    },
  },
}))

const TooltipProvider = BaseTooltip.Provider

const Tooltip = BaseTooltip.Root

const TooltipTrigger = BaseTooltip.Trigger

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Positioner> {
  sideOffset?: number
}

const TooltipContent = ({
  className,
  sideOffset = 4,
  children,
  ...props
}: TooltipContentProps) => {
  const { classes, cx } = useStyles()
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner sideOffset={sideOffset} {...props}>
        <BaseTooltip.Popup
          className={cx(
            classes.content,
            typeof className === 'string' ? className : undefined,
          )}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
