/** Adds a slight delay to ensure the DOM has updated before scrolling */
export const scrollToBottomUtil = (
  conversationContainerRef: React.RefObject<HTMLDivElement>,
) => {
  setTimeout(() => {
    if (conversationContainerRef.current) {
      conversationContainerRef.current.scrollTo({
        top: conversationContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, 100)
}
