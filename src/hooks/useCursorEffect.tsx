import { useEffect, useState, useContext } from 'react';
export const useCursorEffect = () => {
  const [cursorType, setCursorType] = useState<'normal' | 'hovered' | 'clicked'>('normal');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const elements = document.querySelectorAll('[data-id="special"], a, li, button');

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

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
      setCursorType(document.querySelectorAll(':hover').length > 0 ? 'hovered' : 'normal');
    };

    elements.forEach(element => {
      element.addEventListener('mouseover', mouseoverFunc);
      element.addEventListener('mouseout', mouseoutFunc);
      element.addEventListener('mousedown', mousedownFunc);
      element.addEventListener('mouseup', mouseupFunc);
    });
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      elements.forEach(element => {
        element.removeEventListener('mouseover', mouseoverFunc);
        element.removeEventListener('mouseout', mouseoutFunc);
        element.removeEventListener('mousedown', mousedownFunc);
        element.removeEventListener('mouseup', mouseupFunc);
      });
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return { cursorPos, cursorType };
};
