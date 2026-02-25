export function openSidebar() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.setProperty('--SideNavigation-slideIn', '1')

    // Dispatch event to notify component
    const event = new CustomEvent('sidebar:open')
    window.dispatchEvent(event)
  }
}

export function closeSidebar() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn')
    document.body.style.removeProperty('overflow')

    // Dispatch event to notify component
    const event = new CustomEvent('sidebar:close')
    window.dispatchEvent(event)
  }
}

export function toggleSidebar() {
  if (typeof window !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--SideNavigation-slideIn')

    if (slideIn) {
      closeSidebar()
    } else {
      openSidebar()
    }
  }
}
