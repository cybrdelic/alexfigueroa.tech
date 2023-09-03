import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { darkTheme } from '../../theming/theme';
import { usePageTransitions } from '../../hooks/usePageTransitions';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import { aboveTheFold, absoluteCenter, absoluteTopLeft, fullViewport, relative } from '../../theming/util-style-functions/position';
import { flexCenter } from '../../theming/util-style-functions/layout';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';

interface BackgroundImageProps {
  children: React.ReactNode,
}

const ParentContainer = styled.div`
  ${absoluteTopLeft};
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  ${absoluteTopLeft};
`;

const ContentContainer = createStyledMotionComponent('div')(props => `
  ${fullViewport};
`);



const BackgroundImage = ({ children }: BackgroundImageProps) => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isDarkMode = useMemo(() => theme.mode === 'dark', [theme]);

  const mousePos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

  const easing = useCallback((t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, []);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, state: { gap: number, distortion: number }) => {
    for (let i = 0; i < ctx.canvas.width; i += state.gap) {
      for (let j = 0; j < ctx.canvas.height; j += state.gap) {
        // Distance from current point to the mouse
        const dxMouse = mousePos.current.x - i;
        const dyMouse = mousePos.current.y - j;
        const distFromMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        const easedDistFromMouse = easing(distFromMouse / Math.max(ctx.canvas.width, ctx.canvas.height));

        // Calculate distance from current point to its nearest corner
        const cornerDistances = [
          Math.sqrt(i * i + j * j), // top left
          Math.sqrt((ctx.canvas.width - i) * (ctx.canvas.width - i) + j * j), // top right
          Math.sqrt(i * i + (ctx.canvas.height - j) * (ctx.canvas.height - j)), // bottom left
          Math.sqrt((ctx.canvas.width - i) * (ctx.canvas.width - i) + (ctx.canvas.height - j) * (ctx.canvas.height - j)) // bottom right
        ];
        const minCornerDist = Math.min(...cornerDistances);

        // Calculate distance from mouse to nearest corner
        const mouseToCornerDistances = [
          Math.sqrt(mousePos.current.x * mousePos.current.x + mousePos.current.y * mousePos.current.y), // top left
          Math.sqrt((ctx.canvas.width - mousePos.current.x) * (ctx.canvas.width - mousePos.current.x) + mousePos.current.y * mousePos.current.y), // top right
          Math.sqrt(mousePos.current.x * mousePos.current.x + (ctx.canvas.height - mousePos.current.y) * (ctx.canvas.height - mousePos.current.y)), // bottom left
          Math.sqrt((ctx.canvas.width - mousePos.current.x) * (ctx.canvas.width - mousePos.current.x) + (ctx.canvas.height - mousePos.current.y) * (ctx.canvas.height - mousePos.current.y)) // bottom right
        ];
        const minMouseToCornerDist = Math.min(...mouseToCornerDistances);

        const alpha = 1 - (minMouseToCornerDist / Math.sqrt(ctx.canvas.width * ctx.canvas.width + ctx.canvas.height * ctx.canvas.height));

        ctx.lineWidth = 1 + 3 * (1 - easedDistFromMouse);
        ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${0.05 * alpha - easedDistFromMouse / 15})` : `rgba(0,0,0, ${0.05 * alpha - easedDistFromMouse / 15})`;

        const size = state.gap + Math.sin(distFromMouse / state.distortion) * state.gap;
        ctx.beginPath();
        ctx.rect(i - size / 2, j - size / 2, size, size);
        ctx.stroke();
      }
    }
  }, [easing, theme]);


  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = {
      gap: 20,
      distortion: 10000,
    };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx, state);

    ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [drawGrid]);

  const throttledDraw = _.throttle(draw, 100 / 15);


  useEffect(() => {
    if (window.innerWidth > 768) {
      const mouseMove = (e: MouseEvent) => {
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
        throttledDraw();
      };
      window.addEventListener('mousemove', mouseMove);
      throttledDraw();
      return () => {
        window.removeEventListener('mousemove', mouseMove);
      };
    }
  }, [throttledDraw]);


  return (
    <ParentContainer>
      <CanvasContainer>
        <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 0, backgroundColor: isDarkMode ? 'black' : 'white' }} />
      </CanvasContainer>
      <ContentContainer>
        {children}
      </ContentContainer>
    </ParentContainer>
  );
}

export default BackgroundImage;
