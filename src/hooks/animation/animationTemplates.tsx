export const animationTemplates = {
    fadeIn: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
    slideIn: {
      initial: { x: '100vw' },
      animate: { x: 0 },
      exit: { x: '-100vw' },
    },
    // Add other predefined animations here...
  };