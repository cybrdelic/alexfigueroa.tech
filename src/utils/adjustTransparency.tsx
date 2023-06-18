export function adjustTransparency(rgba: string, transparency: number) {
    const regex = /rgba\((\d+),(\d+),(\d+),(\d(\.\d)?)\)/;
    const match = rgba.match(regex);
  
    if (!match) {
      throw new Error('Invalid color format');
    }
  
    const [r, g, b] = match.slice(1, 4);
    return `rgba(${r},${g},${b},${transparency})`;
  }