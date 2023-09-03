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

  const distanceBetweenPoints = (
    x1: number,
    y1: number,
    x2: number,
    y2: number) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  const cornerDistancesForPoint = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    return [
      distanceBetweenPoints(x, y, 0, 0),
      distanceBetweenPoints(x, y, width, 0),
      distanceBetweenPoints(x, y, 0, height),
      distanceBetweenPoints(x, y, width, height)
    ];
  }

  const minDistanceToCorner = (x, y, width, height) => {
    return Math.min(...cornerDistancesForPoint(x, y, width, height));
  }

  const drawGrid = useCallback((ctx, state) => {
    const { width, height } = ctx.canvas;

    for (let i = 0; i < width; i += state.gap) {
      for (let j = 0; j < height; j += state.gap) {
        const distFromMouse = distanceBetweenPoints(mousePos.current.x, mousePos.current.y, i, j);
        const easedDistFromMouse = easing(distFromMouse / Math.max(width, height));

        const minMouseToCornerDist = minDistanceToCorner(mousePos.current.x, mousePos.current.y, width, height);

        const baseAlpha = 1 - (minMouseToCornerDist / Math.sqrt(width * width + height * height));
        const fadeFactor = j / height * 0.9; // Cells at the top will have a value closer to 0, and cells at the bottom closer to 1

        // Combine the baseAlpha with the fadeFactor. You can adjust the fadeFactor multiplier (0.5 here) to influence the fading intensity.
        const combinedAlpha = baseAlpha * fadeFactor;

        ctx.lineWidth = 1 + 3 * (1 - easedDistFromMouse);
        ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${0.05 * combinedAlpha - easedDistFromMouse / 15})` : `rgba(0,0,0, ${0.05 * combinedAlpha - easedDistFromMouse / 15})`;

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
