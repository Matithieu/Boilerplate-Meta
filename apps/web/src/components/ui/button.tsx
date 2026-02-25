import { Button as BaseUiButton } from '@base-ui/react/button'
import { FC } from 'react'

type ButtonProps = React.ComponentPropsWithoutRef<typeof BaseUiButton>

const Button: FC<ButtonProps> = (props) => {
  return <BaseUiButton {...props} />
}

export default Button
