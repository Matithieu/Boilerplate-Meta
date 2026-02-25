import { spinKeyframe } from '@/theme/animations'
import { makeStyles } from '@/theme/makeStyles'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    color: theme.colors.foreground,
  },
  spinner: {
    width: '2rem',
    height: '2rem',
    animation: `${spinKeyframe} 1s linear infinite`,
  },
}))

const LoadingCircular: FC = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.container} id="suspense-fallback">
      <Loader2 className={classes.spinner} />
    </div>
  )
}

export default LoadingCircular
