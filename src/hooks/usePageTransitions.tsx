import { useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

export const usePageTransitions = () => {
  const controls = useAnimation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [gridScale, setGridScale] = useState(1);

  useEffect(() => {
    if (isTransitioning) {
      let start = null;
  
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / 500, 1); // transition duration reduced to 500ms
        setGridScale(10 - progress * 9);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setIsTransitioning(false);
        }
      }
      window.requestAnimationFrame(step);
    }
  }, [isTransitioning]);

  const onPageEnter = async () => {
    setIsTransitioning(true);

    await controls.start({
      opacity: 0,
      scale: 0.95,
      x: '100vw',
      transition: { duration: 0 }
    });

    await controls.start({
      opacity: 1,
      scale: 1.05,
      x: 0,
      transition: { type: 'spring', duration: 0.4 }
    });

    return controls.start({
      scale: 1,
      transition: { type: 'spring', duration: 0.2 }
    });
  };

  return {
    onPageEnter,
    controls,
    gridScale
  };
};
