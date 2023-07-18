// utils/drawUtils.ts
import { Theme, darkTheme } from '../theming/theme';

export const drawGridPattern = (ctx: CanvasRenderingContext2D, mousePos: { x: number, y: number }, state: { gap: number, distortion: number }, theme: Theme) => {
  const easing = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = 0; i < ctx.canvas.width; i += state.gap) {
    for (let j = 0; j < ctx.canvas.height; j += state.gap) {
      const dx = mousePos.x - i;
      const dy = mousePos.y - j;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const easedDist = easing(dist / Math.max(ctx.canvas.width, ctx.canvas.height));

      ctx.lineWidth = 1 + 3 * (1 - easedDist);
      ctx.strokeStyle = theme === darkTheme ? `rgba(255, 255, 255, ${0.05 - easedDist / 15})` : `rgba(0,0,0, ${0.1 - easedDist / 15})`;

      const size = state.gap + Math.sin(dist / state.distortion) * state.gap;
      ctx.beginPath();
      ctx.rect(i - size / 2, j - size / 2, size, size);
      ctx.stroke();
    }
  }

  ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
