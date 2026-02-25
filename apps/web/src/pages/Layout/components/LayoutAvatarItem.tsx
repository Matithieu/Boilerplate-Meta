import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { makeStyles } from '@/theme/makeStyles'
import { LogOut } from 'lucide-react'
import { FC } from 'react'

import { useAppNavigate } from '../../../hooks/useAppNavigate'
import useAuthManager from '../../../hooks/useAuthManager'
import useUserStore from '../../../stores/UserStore'

interface LayoutAvatarItemProps {
  open: boolean
}

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '0.25rem',
    padding: '0.25rem 0 0.5rem',
  },
  accountButton: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    gap: '0.5rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'inherit',
    padding: 0,
    minWidth: 0,
    borderRadius: theme.radius.md,
    transition: 'opacity 0.15s ease',
    '&:hover': { opacity: 0.8 },
  },
  nameBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 0,
  },
  firstName: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: theme.colors.foreground,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  lastName: {
    fontSize: '0.75rem',
    color: theme.colors.mutedForeground,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  logoutButton: {
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    padding: '0.375rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: theme.colors.mutedForeground,
    opacity: 0.35,
    transition:
      'background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease',
    '&:hover': {
      opacity: 1,
      backgroundColor: theme.colors.accent,
      color: theme.colors.accentForeground,
    },
  },
}))

const LayoutAvatarItem: FC<LayoutAvatarItemProps> = ({ open }) => {
  const { user } = useUserStore()
  const authManager = useAuthManager()
  const { navigation } = useAppNavigate()
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <button
        className={classes.accountButton}
        onClick={(e) => {
          e.stopPropagation()
          navigation.toAccount()
        }}
      >
        <Avatar style={{ flexShrink: 0 }}>
          <AvatarFallback>
            {user?.firstName?.charAt(0).toLocaleUpperCase() ?? 'X'}
          </AvatarFallback>
        </Avatar>

        <div
          className={classes.nameBlock}
          style={{
            opacity: open ? 1 : 0,
            maxWidth: open ? '120px' : '0',
            overflow: 'hidden',
            transition: 'opacity 0.3s ease, max-width 0.35s ease',
          }}
        >
          <span className={classes.firstName}>
            {user?.firstName ?? 'Error'}
          </span>
          <span className={classes.lastName}>{user?.lastName ?? 'Error'}</span>
        </div>
      </button>

      {open ? (
        <button
          className={classes.logoutButton}
          onClick={(e) => {
            e.preventDefault()
            authManager.signOut()
          }}
        >
          <LogOut style={{ width: '1rem', height: '1rem' }} />
        </button>
      ) : undefined}
    </div>
  )
}

export default LayoutAvatarItem
