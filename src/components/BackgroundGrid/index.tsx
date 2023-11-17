import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import _ from 'lodash';
import { absoluteTopLeft, fullViewport } from '../../theming/util-style-functions/position';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import { useActiveProject } from '../../contexts/ActiveProjectContext';

interface BackgroundImageProps {
  children: React.ReactNode;
}

const ParentContainer = styled.div`
  ${absoluteTopLeft}
  pointer-events: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CanvasContainer = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const ContentContainer = createStyledMotionComponent('div')(props => `
  ${fullViewport};
`);

const adjustColor = (color, amount) => {
  let usePound = true;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  let b = ((num >> 8) & 0x00FF) + amount;
  let g = (num & 0x0000FF) + amount;

  r = Math.max(Math.min(255, r), 0);
  b = Math.max(Math.min(255, b), 0);
  g = Math.max(Math.min(255, g), 0);

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, "0");
};

// Lighten a color
const lightenColor = (color, percent) => adjustColor(color, percent);

// Darken a color
const darkenColor = (color, percent) => adjustColor(color, -percent);


const BackgroundImage = ({ children }: BackgroundImageProps) => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkMode = useMemo(() => theme.mode === 'dark', [theme]);
  const mousePos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const { activeProject } = useActiveProject();
  const activeProjectColor = activeProject?.colors?.primary ?? 'green';
  const distanceBetweenPoints = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

  const cornerDistancesForPoint = (x, y, width, height) => [
    distanceBetweenPoints(x, y, 0, 0),
    distanceBetweenPoints(x, y, width, 0),
    distanceBetweenPoints(x, y, 0, height),
    distanceBetweenPoints(x, y, width, height)
  ];

  const easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const drawGrid = useCallback((ctx, state) => {
    const { width, height } = ctx.canvas;

    for (let i = 0; i < width; i += state.gap) {
      for (let j = 0; j < height; j += state.gap) {
        const distFromMouse = distanceBetweenPoints(mousePos.current.x, mousePos.current.y, i, j);
        const easedDistFromMouse = easing(distFromMouse / Math.max(width, height));
        const minMouseToCornerDist = Math.min(...cornerDistancesForPoint(mousePos.current.x, mousePos.current.y, width, height));
        const baseAlpha = 1 - (minMouseToCornerDist / Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)));
        const fadeFactor = j / height * 1.2;

        const combinedAlpha = baseAlpha * fadeFactor;
        ctx.lineWidth = 1.25 + 4 * easedDistFromMouse;
        ctx.strokeStyle = isDarkMode
          ? `rgba(255, 255, 255, ${0.06 * combinedAlpha - easedDistFromMouse / 20})`
          : `rgba(0, 0, 0, ${0.05 * combinedAlpha - easedDistFromMouse / 20})`;

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
      gap: 15,
      distortion: 100000,
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradientX = mousePos.current.x / window.innerWidth;
    const gradientY = mousePos.current.y / window.innerHeight;
    const gradient = ctx.createRadialGradient(
      canvas.width * gradientX,
      canvas.height * gradientY,
      0,
      canvas.width * gradientX,
      canvas.height * gradientY,
      Math.max(canvas.width, canvas.height) / 2
    );

    const brighterColor = darkenColor(activeProjectColor, 35);
    const darkerColor = darkenColor(activeProjectColor, 50);
    gradient.addColorStop(0, brighterColor);
    gradient.addColorStop(1, darkerColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx, state);
  }, [drawGrid, activeProjectColor, isDarkMode]);

  const throttledDraw = _.throttle(draw, 1000 / 15);

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
      <CanvasContainer ref={canvasRef} />
      <ContentContainer>
        {children}
      </ContentContainer>
    </ParentContainer>
  );
}

export default BackgroundImage;
