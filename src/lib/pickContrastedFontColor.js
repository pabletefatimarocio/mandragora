export function pickContrastedFontColor(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  const fixedR = srgbToLinear(r);
  const fixedG = srgbToLinear(g);
  const fixedB = srgbToLinear(b);

  const luminance = 0.2126 * fixedR + 0.7152 * fixedG + 0.0722 * fixedB;

  const contrastWhite = 1.05 / (luminance + 0.05);
  const contrastBlack = (luminance + 0.05) / 0.05;

  return contrastWhite > contrastBlack ? "#F5F5F5" : "#000000";
}

function srgbToLinear(color) {
  const c = color / 255;

  if (c <= 0.03928) {
    return c / 12.92;
  }

  return Math.pow((c + 0.055) / 1.055, 2.4);
}
