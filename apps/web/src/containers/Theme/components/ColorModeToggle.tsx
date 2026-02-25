import Button from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { FC } from 'react'

import { useTheme } from '../ThemeProvider'

const ColorModeToggle: FC = () => {
  const { theme, setTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>{isDark ? <Moon /> : <Sun />}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ColorModeToggle
