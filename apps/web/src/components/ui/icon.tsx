import { icons } from 'lucide-react'
import { FC } from 'react'

type IconProps = {
  name: keyof typeof icons
  color: string
  size: number
  className?: string
}

const Icon: FC<IconProps> = ({ name, color, size, className }) => {
  const LucideIcon = icons[name as keyof typeof icons]

  return <LucideIcon className={className} color={color} size={size} />
}

export default Icon
