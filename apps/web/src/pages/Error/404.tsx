import Button from '@/components/ui/button'
import { makeStyles } from '@/theme/makeStyles'

import { useAppNavigate } from '../../hooks/useAppNavigate'
import { formatMessage } from '../../services/intl/intl'
import errorMessages from './error.messages'

const useStyles = makeStyles()((theme) => ({
  container: {
    maxWidth: '36rem',
    margin: '0 auto',
    marginTop: '4rem',
    marginBottom: '2rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSize['5xl'],
    fontWeight: theme.fontWeight.bold,
  },
  description: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.mutedForeground,
  },
  button: {
    marginTop: '1.5rem',
    marginBottom: '1rem',
  },
}))

export default function Page404() {
  const { navigation } = useAppNavigate()
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.title}>404</h1>
        <h4 className={classes.description}>
          {formatMessage(errorMessages.description)}
        </h4>
        <Button
          className={classes.button}
          onClick={() => {
            navigation.toHome()
          }}
        >
          {formatMessage(errorMessages.buttonText)}
        </Button>
      </div>
    </div>
  )
}
