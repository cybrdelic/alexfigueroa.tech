import { useAnimation } from "framer-motion";

export const usePageTransitions = () => {
  const controls = useAnimation();

  const onPageEnter = async () => {
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

  const onPageExit = () => {
    return controls.start({
      opacity: 0,
      x: '-100vw',
      transition: { duration: 0.4 }
    });
  };

  return {
    onPageEnter,
    onPageExit,
    controls
  };
};
