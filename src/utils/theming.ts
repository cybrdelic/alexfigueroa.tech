export type RGB = {
    r: number;
    g: number;
    b: number;
};

export const hexToRgb = (hex: string): RGB => {
    hex = hex.charAt(0) === '#' ? hex.slice(1) : hex;
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

export const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
}

export const shadeColor = (color: RGB, percent: number): RGB => {
    const amount = Math.round(1.2 * percent);
    return {
        r: Math.min(255, Math.max(0, color.r + amount)),
        g: Math.min(255, Math.max(0, color.g + amount)),
        b: Math.min(255, Math.max(0, color.b + amount))
    };
}
