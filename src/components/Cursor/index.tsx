import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { CursorContext } from '../../contexts/CursorContext';

const Cursor = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  border: 2px solid white;
  border-radius: 50%;
  mix-blend-mode: difference;
  transition: all 150ms ease;
  transition-property: background-color, opacity, transform, mix-blend-mode;
  will-change: width, height, transform;
`;

export default function CustomCursor() {
  const cursorType = useContext(CursorContext);
  console.log('CursorContext value in CustomCursor:', cursorType); // Log here

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPos = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", updateCursorPos);

    return () => {
      document.removeEventListener("mousemove", updateCursorPos);
    };
  }, []);

  const defaultCursorStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
    opacity: 0.7,
    mixBlendMode: 'difference',
    left: `${cursorPos.x}px`,
    top: `${cursorPos.y}px`,
  };

  const hoveredCursorStyles: React.CSSProperties = {
    backgroundColor: 'white',
    opacity: 1,
    transform: 'scale(3)',
  };

  const outerCursorStyles = {
    width: '56px',
    height: '56px',
    ...defaultCursorStyles,
    ...(cursorType === 'hovered' ? hoveredCursorStyles : {}),
  };

  return (
    <>
      <Cursor style={outerCursorStyles} />
    </>
  );
};
