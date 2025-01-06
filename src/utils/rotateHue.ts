/**
 * Rotates the hue of an RGB color by the specified angle in degrees.
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @param angle - Angle by which to rotate the hue (in degrees)
 * @returns Rotated color in RGB format as an object { r, g, b }
 */
function rotateHue(r: number, g: number, b: number, angle: number): { r: number; g: number; b: number } {
  // Helper function to convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (delta !== 0) {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / delta) % 6;
          break;
        case g:
          h = (b - r) / delta + 2;
          break;
        case b:
          h = (r - g) / delta + 4;
          break;
      }

      h *= 60;
      if (h < 0) h += 360;
    }

    return [h, s, l];
  };

  // Helper function to convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    const hueToRgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    if (s === 0) {
      const val = Math.round(l * 255);
      return { r: val, g: val, b: val }; // Grayscale
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = hueToRgb(p, q, h / 360 + 1 / 3);
    const g = hueToRgb(p, q, h / 360);
    const b = hueToRgb(p, q, h / 360 - 1 / 3);

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  // Convert RGB to HSL
  let [h, s, l] = rgbToHsl(r, g, b);

  // Rotate the hue
  h = (h + angle) % 360;
  if (h < 0) h += 360;

  // Convert back to RGB
  return hslToRgb(h, s, l);
}

export default rotateHue;
