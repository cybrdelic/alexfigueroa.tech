// useInvertColors.js
import { useEffect } from 'react';

const useInvertColors = (cursorPos: any) => {
  const isNearCursor = (x: number, y: number, distance = 50) => {
    const dx = cursorPos.x - x;
    const dy = cursorPos.y - y;
    return Math.sqrt(dx * dx + dy * dy) < distance;
  };

  const invertColors = () => {
    const elements = document.querySelectorAll('p, link, button, a, h1');
  
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      let distanceThreshold = 50;  // Default distance threshold
      
      // If the element is clickable or contains readable text, increase the distance threshold
      if (el.classList.contains('clickable') || el.classList.contains('readable')) {
        distanceThreshold = 100;
      }
  
      // Use a type assertion to tell TypeScript that `el` is an HTMLElement
      const htmlElement = el as HTMLElement;
  
      if (isNearCursor(centerX, centerY, distanceThreshold)) {
        htmlElement.style.filter = 'invert(1)';
      } else {
        htmlElement.style.filter = '';
      }
    });
  };
  
  
  useEffect(invertColors, [cursorPos, isNearCursor]);
  
};

export default useInvertColors;
