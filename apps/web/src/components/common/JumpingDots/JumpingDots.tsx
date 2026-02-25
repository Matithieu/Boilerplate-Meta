import { makeStyles } from '@/theme/makeStyles'
import { FC } from 'react'

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  dot1: {
    animation: `1s infinite`,
    animationDelay: '-0.3s',
  },
  dot2: {
    animation: `1s infinite`,
    animationDelay: '-0.15s',
  },
  dot3: {
    animation: `1s infinite`,
  },
}))

const JumpingDots: FC = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.dot1}>.</div>
      <div className={classes.dot2}>.</div>
      <div className={classes.dot3}>.</div>
    </div>
  )
}

export default JumpingDots
