import { useEffect, useState, useContext } from 'react';

export const useCursorEffect = () => {
  const [cursorType, setCursorType] = useState<'normal' | 'hovered'>('normal');

  useEffect(() => {
    const elements = document.querySelectorAll('[data-id="special"], a, li, button');

    const mouseoverFunc = () => {
      setCursorType('hovered');
    };

    const mouseoutFunc = () => {
      setCursorType('normal');
    };

    elements.forEach(element => {
      element.addEventListener('mouseover', mouseoverFunc);
      element.addEventListener('mouseout', mouseoutFunc);
    });

    return () => {
      elements.forEach(element => {
        element.removeEventListener('mouseover', mouseoverFunc);
        element.removeEventListener('mouseout', mouseoutFunc);
      });
    };
  }, []);

  return cursorType;
};
