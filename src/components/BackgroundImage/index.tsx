import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { darkTheme } from '../../theming/theme';
import { usePageTransitions } from '../../hooks/usePageTransitions';
import { useLocation } from 'react-router-dom';

interface BackgroundImageProps {
  children: React.ReactNode, 
}

const ParentContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const BackgroundImage = ({ children }: BackgroundImageProps) => {
  const theme = useTheme(); 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { onPageEnter, gridScale } = usePageTransitions();
  const location = useLocation();

  useEffect(() => {
    onPageEnter(); // Trigger transition effect whenever the location changes
  }, [location, onPageEnter]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;

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

    const easing = (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < canvas.width; i += state.gap) {
      for(let j = 0; j < canvas.height; j += state.gap) {
        const dx = mousePos.x - i;
        const dy = mousePos.y - j;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const easedDist = easing(dist / Math.max(canvas.width, canvas.height));

        ctx.lineWidth = 1 + 3 * (1 - easedDist); 
        ctx.strokeStyle = theme === darkTheme ? `rgba(255, 255, 255, ${0.05 - easedDist/15})`: `rgba(0,0,0, ${0.1 - easedDist/15})`;

        const size = gridScale * state.gap + Math.sin(dist / state.distortion) * state.gap;
        ctx.beginPath();
        ctx.rect(i - size / 2, j - size / 2, size, size);
        ctx.stroke();
      }
    }

    ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [theme, gridScale]);

  useEffect(() => {
    onPageEnter();
    draw();
  }, [draw, onPageEnter]);

  return (
    <ParentContainer>
      <CanvasContainer>
        <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 0, backgroundColor: theme === darkTheme ? 'black' : 'white' }} />
      </CanvasContainer>
      <ContentContainer>
        {children}
      </ContentContainer>
    </ParentContainer>
  );
}
export default BackgroundImage
