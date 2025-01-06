/**
 * Mixes a color with its mean to create a monochrome effect by a given weight.
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @param weight - Weight for mixing (0 = original color, 1 = full monochrome)
 * @returns Monochrome color in RGB format as an object { r, g, b }
 */
function applyMonochrome(r: number, g: number, b: number, weight: number): { r: number; g: number; b: number } {
  // Clamp the weight between 0 and 1
  weight = Math.min(Math.max(weight, 0), 1);

  // Calculate the mean (average) of the RGB values
  const mean = Math.round((r + g + b) / 3);

  // Interpolate between the original color and the mean based on the weight
  const mix = (original: number, mean: number): number => Math.round(original * (1 - weight) + mean * weight);

  return {
    r: mix(r, mean),
    g: mix(g, mean),
    b: mix(b, mean),
  };
}

export default applyMonochrome;
