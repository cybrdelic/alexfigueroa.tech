import { useEffect, useState, useContext } from 'react';

export const useCursorEffect = () => {
  const [cursorType, setCursorType] = useState<'normal' | 'hovered' | 'clicked'>('normal');

  useEffect(() => {
    const elements = document.querySelectorAll('[data-id="special"], a, li, button');

    const mouseoverFunc = () => {
      setCursorType('hovered');
    };

    const mouseoutFunc = () => {
      setCursorType('normal');
    };

    const mousedownFunc = () => {
      setCursorType('clicked');
    };

    const mouseupFunc = () => {
      // Reset to 'normal' or 'hovered' based on if the mouse is still over the element.
      // This assumes that your elements cannot be simultaneously hovered and clicked.
      setCursorType(document.querySelectorAll(':hover').length > 0 ? 'hovered' : 'normal');
    };

    elements.forEach(element => {
      element.addEventListener('mouseover', mouseoverFunc);
      element.addEventListener('mouseout', mouseoutFunc);
      element.addEventListener('mousedown', mousedownFunc);
      element.addEventListener('mouseup', mouseupFunc);
    });

    return () => {
      elements.forEach(element => {
        element.removeEventListener('mouseover', mouseoverFunc);
        element.removeEventListener('mouseout', mouseoutFunc);
        element.removeEventListener('mousedown', mousedownFunc);
        element.removeEventListener('mouseup', mouseupFunc);
      });
    };
  }, []);

  return cursorType;
};
