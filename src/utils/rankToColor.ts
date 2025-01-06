import applyMonochrome from "./applyMonochrome";
import rotateHue from "./rotateHue";

const rankToColor = (rank: number) => {
  let rgb = { r: 255, g: 220, b: 240 };
  const hue = (rank / 10 + 0.5) * 360;
  rgb = applyMonochrome(rgb.r, rgb.g, rgb.b, 0.125);

  let start = rotateHue(rgb.r, rgb.g, rgb.b, hue);
  let end = rotateHue(rgb.r, rgb.g, rgb.b, hue + 25);

  const left = `rgb(${start.r}, ${start.g}, ${start.b})`;
  const right = `rgb(${end.r}, ${end.g}, ${end.b})`;
  return `linear-gradient(45deg, ${left}, ${right})`;
};
export default rankToColor;
