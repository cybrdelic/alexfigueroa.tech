export function adjustTransparency(hex: string, transparency: number): string {
  if (transparency < 0 || transparency > 1) {
    throw new Error('Invalid transparency value. It should be between 0 and 1.');
  }



  let r: number;
  let g: number;
  let b: number;

  // If it's a shorthand hex color (e.g., "#FFF")
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }

  return `rgba(${r},${g},${b},${transparency})`;
}
