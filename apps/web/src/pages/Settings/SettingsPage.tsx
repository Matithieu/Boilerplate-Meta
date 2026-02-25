import { FC } from 'react'

import Tabs from '../../components/common/Tabs'
import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import { formatMessage } from '../../services/intl/intl'
import settingsMessages from './settings.messages'
import AppearanceTab from './tabs/Appearance'

const SettingsPage: FC = () => {
  return (
    <div>
      <div style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
        <HeaderTitle text={formatMessage(settingsMessages.settings)} />
      </div>

      <Tabs
        tabs={[
          {
            content: <AppearanceTab />,
            name: formatMessage(settingsMessages.appearance),
          },
        ]}
      />
    </div>
  )
}

export default SettingsPage
