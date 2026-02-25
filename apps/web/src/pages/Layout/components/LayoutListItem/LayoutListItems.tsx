import { Separator } from '@/components/ui/separator'
import { makeStyles } from '@/theme/makeStyles'
import { LayoutDashboard, Settings, Sparkles } from 'lucide-react'
import { FC, Fragment } from 'react'

import { routesPath } from '../../../../containers/Router/routesPath'
import { useAppNavigate } from '../../../../hooks/useAppNavigate'
import { formatMessage } from '../../../../services/intl/intl'
import layoutMessages from '../../layout.messages'
import LayoutAvatarItem from '../LayoutAvatarItem'
import LayoutItem from './LayoutItem'

interface LayoutListItemsProps {
  open: boolean
}

const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '0.5rem',
    overflowY: 'auto',
    minHeight: 0,
  },
  topList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
  },
  bottomList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
  },
  avatarWrapper: {
    padding: '0.5rem',
  },
}))

const LayoutListItems: FC<LayoutListItemsProps> = ({ open }) => {
  const { navigation } = useAppNavigate()
  const { classes } = useStyles()

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <ul className={classes.topList}>
          <LayoutItem
            icon={<LayoutDashboard />}
            navigation={() => navigation.toDashboard()}
            open={open}
            path={routesPath.dashboard}
            title="Dashboard"
          />
          <LayoutItem
            icon={<Sparkles />}
            navigation={() => navigation.toAi()}
            open={open}
            path={routesPath.ai}
            title="AI"
          />
        </ul>

        <ul className={classes.bottomList}>
          <LayoutItem
            icon={<Settings />}
            navigation={() => navigation.toSettings()}
            open={open}
            path={routesPath.settings}
            title={formatMessage(layoutMessages.settings)}
          />
        </ul>
      </div>

      <Separator />

      <div className={classes.avatarWrapper}>
        <LayoutAvatarItem open={open} />
      </div>
    </Fragment>
  )
}

export default LayoutListItems
