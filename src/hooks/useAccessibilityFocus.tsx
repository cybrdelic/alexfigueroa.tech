import { useRef, useLayoutEffect } from 'react';

export const useAccessibilityFocus = () => {
  const ref = useRef();

  useLayoutEffect(() => {
    ref?.current?.focus();
  }, []);

  return ref;
};
