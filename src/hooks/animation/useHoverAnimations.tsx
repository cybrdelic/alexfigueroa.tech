import { useState } from "react";

export function useHoverAnimations() {
  const [isHovered, setHovered] = useState(false);
  
  const hoverAnimations = {
    hover: { scale: 1.2 },
    tap: { scale: 0.95 },
  };

  return { isHovered, setHovered, hoverAnimations };
}
