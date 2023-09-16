import { useEffect, useState, useCallback } from 'react';
import { useCursorState } from '../contexts/CursorContext';

export const useCursorEffect = () => {
  const [{ cursorType, cursorPos }, setCursorState] = useCursorState();


  const handleMouseMove = useCallback((e) => {
    setCursorState((prevState) => ({ ...prevState, cursorPos: { x: e.clientX, y: e.clientY } }));
  }, [setCursorState]);

  const mouseoverFunc = useCallback(() => setCursorState((prevState) => ({ ...prevState, cursorType: 'hovered' })), [setCursorState]);
  const mouseoutFunc = useCallback(() => setCursorState((prevState) => ({ ...prevState, cursorType: 'normal' })), [setCursorState]);
  const mousedownFunc = useCallback(() => setCursorState((prevState) => ({ ...prevState, cursorType: 'clicked' })), [setCursorState]);
  const mouseupFunc = useCallback(() => {
    const type = document.querySelectorAll(':hover').length > 0 ? 'hovered' : 'normal';
    setCursorState((prevState) => ({ ...prevState, cursorType: type }));
  }, [setCursorState]);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-id="special"], a, li, button');

    elements.forEach(element => {
      element.addEventListener('mouseover', mouseoverFunc);
      element.addEventListener('mouseout', mouseoutFunc);
      element.addEventListener('mousedown', mousedownFunc);
      element.addEventListener('mouseup', mouseupFunc);
    });

    document.addEventListener("mousemove", handleMouseMove, { passive: true });  // passive improves performance

    return () => {
      elements.forEach(element => {
        element.removeEventListener('mouseover', mouseoverFunc);
        element.removeEventListener('mouseout', mouseoutFunc);
        element.removeEventListener('mousedown', mousedownFunc);
        element.removeEventListener('mouseup', mouseupFunc);
      });
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, mouseoverFunc, mouseoutFunc, mousedownFunc, mouseupFunc]);

  return { cursorPos, cursorType };
};
