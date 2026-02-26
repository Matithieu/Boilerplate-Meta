import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseSidebarStateReturn {
  isOpen: boolean
  sidebarRef: React.RefObject<HTMLElement>
  handleToggle: () => void
  handleClose: () => void
  handleKeyDown: (event: React.KeyboardEvent) => void
}

export const useSidebarState = (): UseSidebarStateReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLElement | null>(null)

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose()
      }
    },
    [isOpen, handleClose],
  )

  // Handle custom window events for programmatic open/close (used by mobile header)
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true)
    const handleCloseEvent = () => handleClose()

    window.addEventListener('sidebar:open', handleOpenEvent)
    window.addEventListener('sidebar:close', handleCloseEvent)

    return () => {
      window.removeEventListener('sidebar:open', handleOpenEvent)
      window.removeEventListener('sidebar:close', handleCloseEvent)
    }
  }, [handleClose])

  // Update body overflow and CSS var when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.setProperty(
        '--SideNavigation-slideIn',
        '1',
      )
    } else {
      document.body.style.removeProperty('overflow')
      document.documentElement.style.removeProperty('--SideNavigation-slideIn')
    }
  }, [isOpen])

  return {
    isOpen,
    sidebarRef,
    handleToggle,
    handleClose,
    handleKeyDown,
  }
}
