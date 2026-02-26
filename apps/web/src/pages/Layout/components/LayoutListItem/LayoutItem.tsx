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

const useStyles = makeStyles<{ isActive: boolean; open: boolean }>()(
  (theme, { isActive }) => ({
    button: {
      display: 'flex',
      width: '100%',
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '0.5rem',
      borderRadius: theme.radius.md,
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      paddingRight: '0.5rem',
      // Pin icon center at 37.5px (center of 75px collapsed width)
      // 37.5px - outer-wrapper-padding(0.5rem) - half-icon-width(0.625rem)
      paddingLeft: 'calc(37.5px - 1.125rem)',
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
  const { classes } = useStyles({ isActive, open })

  const buttonContent = (
    <>
      <span className={classes.iconSpan}>{icon}</span>
      <span
        style={{
          whiteSpace: 'nowrap',
          fontSize: '0.875rem',
          fontWeight: 500,
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
