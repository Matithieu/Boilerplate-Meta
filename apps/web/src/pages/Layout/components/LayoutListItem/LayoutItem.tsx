import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { makeStyles } from '@/theme/makeStyles'
import { FC, ReactNode } from 'react'
import { useMatch } from 'react-router'

type LayoutListItemProps = {
  icon: ReactNode
  open: boolean
  path: string
  title: string
  navigation: () => void
}

const useStyles = makeStyles<{ isActive: boolean }>()(
  (theme, { isActive }) => ({
    button: {
      display: 'flex',
      width: '100%',
      cursor: 'pointer',
      alignItems: 'center',
      gap: '0.5rem',
      borderRadius: theme.radius.md,
      padding: '0.5rem',
      border: 'none',
      background: isActive ? theme.colors.primaryAlpha10 : 'none',
      color: isActive ? theme.colors.primary : theme.colors.mutedForeground,
      transition: 'background-color 0.15s ease, color 0.15s ease',
      '&:hover': {
        backgroundColor: isActive
          ? theme.colors.primaryAlpha10
          : theme.colors.accent,
        color: isActive ? theme.colors.primary : theme.colors.accentForeground,
      },
    },
    iconSpan: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      '& > svg': {
        width: '1.25rem',
        height: '1.25rem',
      },
    },
  }),
)

const LayoutItem: FC<LayoutListItemProps> = ({
  icon,
  open,
  path,
  title,
  navigation,
}) => {
  const match = useMatch({ path, end: true })
  const isActive = !!match
  const { classes } = useStyles({ isActive })

  const buttonContent = (
    <>
      <span className={classes.iconSpan}>{icon}</span>
      <span
        style={{
          flex: 1,
          whiteSpace: 'nowrap',
          fontSize: '0.875rem',
          fontWeight: 500,
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          maxWidth: open ? '200px' : '0',
          transition: 'opacity 0.3s ease, max-width 0.35s ease',
        }}
      >
        {title}
      </span>
    </>
  )

  return (
    <li>
      {open ? (
        <button className={classes.button} onClick={navigation}>
          {buttonContent}
        </button>
      ) : (
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                aria-label={title}
                className={classes.button}
                onClick={navigation}
              />
            }
          >
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent side="right">{title}</TooltipContent>
        </Tooltip>
      )}
    </li>
  )
}

export default LayoutItem
