import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ColorModeToggle from '@/containers/Theme/components/ColorModeToggle'
import { FC } from 'react'

import ChangeLanguageSelect from '../../../components/common/Select/ChangeLanguageSelect'
import { formatMessage } from '../../../services/intl/intl'
import settingsMessages from '../settings.messages'

const AppearanceTab: FC = () => {
  return (
    <div>
      <Card
        style={{
          display: 'flex',
          maxWidth: '400px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
        }}
      >
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
          {formatMessage(settingsMessages.language)}
        </h4>

        <ChangeLanguageSelect />
      </Card>

      <Separator className="my-4" />

      <Card
        style={{
          display: 'flex',
          maxWidth: '400px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
        }}
      >
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
          {formatMessage(settingsMessages.appearance)}
        </h4>
        <div>
          <ColorModeToggle />
        </div>
      </Card>
    </div>
  )
}

export default AppearanceTab
