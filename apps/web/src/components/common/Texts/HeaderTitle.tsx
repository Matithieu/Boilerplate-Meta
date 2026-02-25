import { makeStyles } from '@/theme/makeStyles'
import { FC } from 'react'

type HeaderTitleProps = {
  text: string
}

const useStyles = makeStyles()(() => ({
  title: {
    marginTop: '0.5rem',
    fontSize: '1.875rem',
    fontWeight: 700,
    lineHeight: 1.25,
  },
}))

const HeaderTitle: FC<HeaderTitleProps> = ({ text }) => {
  const { classes } = useStyles()
  return (
    <div>
      <h1 className={classes.title}>{text}</h1>
    </div>
  )
}

export default HeaderTitle
