import React, { useContext, useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useCursorState } from '../../contexts/CursorContext';
import { throttle } from 'lodash';
import { zIndex } from '../../theming/design-tokens/spacing';
import { useCursorEffect } from '../../hooks/useCursorEffect';

const Cursor = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: ${zIndex.foreground};
  border: 2px solid white;
  border-radius: 50%;
  mix-blend-mode: difference;
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
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
  z-index: ${zIndex.foreground + 1};
  border: 2px solid white;
  border-radius: 50%;
  mix-blend-mode: difference;
  animation: ${ripple} 1s infinite;
  will-change: width, height, transform;
`;

export default function CustomCursor() {
  const [{ cursorType, cursorPos }, setCursorState] = useCursorState();

  const defaultCursorStyles: React.CSSProperties = {
    backgroundColor: '#000', // Black color
    mixBlendMode: 'difference',
    opacity: 0.7,
    left: `${cursorPos.x}px`,
    top: `${cursorPos.y}px`,
    transition: 'background-color 0.3s, opacity 0.3s, transform 0.3s, left 0.2s, top 0.2s'
  };

  const hoveredCursorStyles: React.CSSProperties = {
    backgroundColor: 'rgba(240,240,240,1)',
    opacity: 1,
    transform: 'scale(3)',
  };

  const clickedCursorStyles: React.CSSProperties = {
    backgroundColor: 'rgba(200,200,200,1)',
    opacity: 0.8,
    transform: 'scale(5) rotate(360deg)',
    transition: 'background-color 0.5s, opacity 0.5s, transform 0.1s, left 0.5s, top 0.5s'
  };

  const outerCursorStyles = {
    width: '30px',
    height: '30px',
    left: `${cursorPos.x}px`,
    top: `${cursorPos.y}px`,
    transform: cursorType === 'hovered' ? 'scale(3)' : cursorType === 'clicked' ? 'scale(1.2)' : 'scale(1)',
    ...defaultCursorStyles,
    ...(cursorType === 'hovered' ? hoveredCursorStyles : {}),
    ...(cursorType === 'clicked' ? clickedCursorStyles : {}),
  };

  const rippleCursorStyles = {
    width: '30px',
    height: '30px',
    left: `${cursorPos.x}px`,
    top: `${cursorPos.y}px`,
    transform: cursorType === 'hovered' ? 'scale(3)' : cursorType === 'clicked' ? 'scale(1.2)' : 'scale(1)',
  };

  return (
    <>
      <Cursor style={outerCursorStyles} />
      {cursorType === 'hovered' && <CursorRipple style={rippleCursorStyles} />}
    </>
  );
};
