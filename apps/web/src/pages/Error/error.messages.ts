import { defineMessages } from 'react-intl'

const scope = 'page404'

export default defineMessages({
  description: {
    defaultMessage: "Oops! The page you're looking for doesn't exist.",
    id: `${scope}.description`,
  },
  buttonText: {
    defaultMessage: 'Back to home',
    id: `${scope}.buttonText`,
  },
})
