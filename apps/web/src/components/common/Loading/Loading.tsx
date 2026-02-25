import { spinKeyframe } from '@/theme/animations'
import { makeStyles } from '@/theme/makeStyles'
import { Loader2 } from 'lucide-react'
import React, { FC } from 'react'

type LoadingProps = {
  children: React.ReactNode
  isLoading: boolean
  isCentered?: boolean
}

const useStyles = makeStyles<{ isCentered: boolean }>()(
  (_theme, { isCentered }) => ({
    wrapper: {
      ...(isCentered && { display: 'flex', justifyContent: 'center' }),
    },
    spinner: {
      margin: 'auto',
      animation: `${spinKeyframe} 1s linear infinite`,
    },
  }),
)

const Loading: FC<LoadingProps> = ({
  children,
  isLoading,
  isCentered = false,
}) => {
  const { classes } = useStyles({ isCentered })
  return isLoading ? (
    <div className={classes.wrapper}>
      <Loader2 className={classes.spinner} />
    </div>
  ) : (
    <>{children}</>
  )
}

export default Loading
