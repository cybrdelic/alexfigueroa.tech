export function adjustTransparency(rgba: string, transparency: number) {
  const rgbaValues = rgba
    .replace("rgba(", "")
    .replace(")", "")
    .split(",")
    .map(Number);

  if (rgbaValues.length !== 4 || rgbaValues.some(isNaN)) {
    throw new Error('Invalid color format');
  }

  const [r, g, b] = rgbaValues;
  return `rgba(${r},${g},${b},${transparency})`;
}
