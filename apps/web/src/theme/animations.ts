// Custom animation keyframes for tss-react components
// Use these with the animation property in your makeStyles

import { keyframes } from 'tss-react'

// Spin animation for loading indicators
export const spinKeyframe = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// Fade animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

// Zoom animations
export const zoomIn95 = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`

export const zoomOut95 = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.95);
  }
`

// Slide in from bottom
export const slideInFromBottom = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`
