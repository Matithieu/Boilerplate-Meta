import { defineMessages } from 'react-intl'

const scope = 'pages.account'

export default defineMessages({
  welcome: {
    defaultMessage: 'Welcome, {name}!',
    id: `${scope}.welcome`,
  },
  accountProfile: {
    defaultMessage: 'Profile',
    id: 'tabs.account',
  },
  invoices: {
    defaultMessage: '{itemCount, plural, one {Invoice} other {Invoices}}',
    id: 'intl.invoices',
  },
  accountDetails: {
    defaultMessage: 'Details',
    id: `${scope}.accountDetails`,
  },
})
