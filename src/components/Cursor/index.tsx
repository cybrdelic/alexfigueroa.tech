import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
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

const ripple = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    opacity: 0;
  }
`;

const CursorRipple = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  border: 2px solid white;
  border-radius: 50%;
  mix-blend-mode: difference;
  animation: ${ripple} 1s infinite;
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
    backgroundColor: 'rgba(240,240,240,1)',
    opacity: 1,
    transform: 'scale(3)',
  };

  const outerCursorStyles = {
    width: '30px',
    height: '30px',
    left: `${cursorPos.x}px`, // Subtract half the size of the cursor
    top: `${cursorPos.y}px`, // Subtract half the size of the cursor
    ...defaultCursorStyles,
    ...(cursorType === 'hovered' ? hoveredCursorStyles : {}),
  };

  const rippleCursorStyles = {
    width: '30px',
    height: '30px',
    left: `${cursorPos.x}px`, // Subtract half the size of the cursor
    top: `${cursorPos.y}px`, // Subtract half the size of the cursor
    transform: cursorType === 'hovered' ? 'scale(3)' : 'scale(1)',
  };


  return (
    <>
      <Cursor style={outerCursorStyles} />
      {cursorType === 'hovered' && <CursorRipple style={rippleCursorStyles} />}
    </>
  );
};
