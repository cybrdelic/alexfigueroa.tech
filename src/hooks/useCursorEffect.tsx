import { useEffect, useState, useContext } from 'react';

export const useCursorEffect = () => {
  const [cursorType, setCursorType] = useState<'normal' | 'hovered'>('normal');

  useEffect(() => {
    const elements = document.querySelectorAll('[data-id="special"], a, button');

    const mouseoverFunc = () => {
      console.log('Mouseover detected.'); // Log here
      setCursorType('hovered');
    };

    const mouseoutFunc = () => {
      console.log('Mouseout detected.'); // Log here
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

  console.log('Cursor type:', cursorType); // Log here

  return cursorType;
};