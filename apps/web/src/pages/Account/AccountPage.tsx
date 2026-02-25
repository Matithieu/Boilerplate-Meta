import { FC } from 'react'

import Tabs from '../../components/common/Tabs'
import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import { formatMessage, formatMessagePlural } from '../../services/intl/intl'
import useUserStore from '../../stores/UserStore'
import ViewInvoices from '../Purchasing/invoice'
import accountMessages from './account.messages'
import Account from './component/Account'

const AccountPage: FC = () => {
  const { user } = useUserStore()

  return (
    <div>
      <div
        style={{
          position: 'sticky',
          top: '-100px',
          zIndex: 1,
          backgroundColor: 'hsl(var(--background))',
        }}
      >
        <div style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
          <HeaderTitle
            text={`${formatMessage(accountMessages.welcome, { name: user?.firstName })}`}
          />
        </div>

        <Tabs
          tabs={[
            {
              content: (
                <Account key={formatMessage(accountMessages.accountProfile)} />
              ),
              name: formatMessage(accountMessages.accountProfile),
            },
            {
              content: (
                <ViewInvoices
                  key={formatMessagePlural(accountMessages.invoices)}
                />
              ),
              name: formatMessagePlural(accountMessages.invoices),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default AccountPage
