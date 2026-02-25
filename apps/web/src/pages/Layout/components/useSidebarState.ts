import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseSidebarStateReturn {
  isOpen: boolean
  isManuallyOpened: boolean
  sidebarRef: React.RefObject<HTMLElement>
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  handleClose: () => void
  handleKeyDown: (event: React.KeyboardEvent) => void
}

interface UseSidebarStateOptions {
  hoverDelay?: number
  hoverLeaveDelay?: number
}

/**
 * Custom hook to manage sidebar state and interactions
 * Handles both hover-based auto-open and manual open/close
 */
export const useSidebarState = (
  options: UseSidebarStateOptions = {},
): UseSidebarStateReturn => {
  const { hoverDelay = 600, hoverLeaveDelay = 100 } = options

  const [isOpen, setIsOpen] = useState(false)
  const [isManuallyOpened, setIsManuallyOpened] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sidebarRef = useRef<HTMLElement | null>(null)

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (isManuallyOpened) return
    clearHoverTimeout()

    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true)
    }, hoverDelay)
  }, [isManuallyOpened, hoverDelay, clearHoverTimeout])

  const handleMouseLeave = useCallback(() => {
    if (isManuallyOpened) return
    clearHoverTimeout()

    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, hoverLeaveDelay)
  }, [isManuallyOpened, hoverLeaveDelay, clearHoverTimeout])

  const handleClose = useCallback(() => {
    setIsManuallyOpened(false)
    setIsOpen(false)
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && isManuallyOpened) {
        handleClose()
      }
    },
    [isManuallyOpened, handleClose],
  )

  // Handle clicks outside sidebar when manually opened
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isManuallyOpened &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        handleClose()
      }
    }

    if (isManuallyOpened) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isManuallyOpened, handleClose])

  // Handle custom window events for programmatic open/close
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsManuallyOpened(true)
      setIsOpen(true)
    }

    const handleCloseEvent = () => {
      handleClose()
    }

    window.addEventListener('sidebar:open', handleOpenEvent)
    window.addEventListener('sidebar:close', handleCloseEvent)

    return () => {
      window.removeEventListener('sidebar:open', handleOpenEvent)
      window.removeEventListener('sidebar:close', handleCloseEvent)
      clearHoverTimeout()
    }
  }, [handleClose, clearHoverTimeout])

  // Update body overflow when manually opened on mobile
  useEffect(() => {
    if (isManuallyOpened) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.setProperty(
        '--SideNavigation-slideIn',
        '1',
      )
    } else {
      document.body.style.removeProperty('overflow')
      document.documentElement.style.removeProperty('--SideNavigation-slideIn')
    }
  }, [isManuallyOpened])

  return {
    isOpen,
    isManuallyOpened,
    sidebarRef,
    handleMouseEnter,
    handleMouseLeave,
    handleClose,
    handleKeyDown,
  }
}
