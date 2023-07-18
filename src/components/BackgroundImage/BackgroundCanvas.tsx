// components/BackgroundImage/BackgroundCanvas.tsx
import React, { useRef, useEffect } from 'react';
import { usePageTransitions } from '../../hooks/usePageTransitions';
import { drawGridPattern } from '../../utils/drawUtils';
import { useTheme } from '../../hooks/useTheme';
import { darkTheme } from '../../theming/theme';

const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mousePos = { x: 0, y: 0 };
    const state = {
      gap: 20,
      distortion: 10000,
    };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    window.addEventListener('mousemove', mouseMove);

    drawGridPattern(ctx, mousePos, state, theme);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [ theme]);

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 0, backgroundColor: theme === darkTheme ? 'black' : 'white' }} />
  );
}

export default BackgroundCanvas;
