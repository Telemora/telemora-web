// utils/colors.ts
import chroma from 'chroma-js';

export const SHADE_LABELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type ShadeLabel = (typeof SHADE_LABELS)[number];

// Helper: normalize any css color (hex/rgb/hsl) or fall back.
function normalize(color: string | undefined, fallback: string): string {
  const c = (color ?? '').trim();
  return chroma.valid(c) ? chroma(c).hex() : chroma(fallback).hex();
}

/**
 * Build a Tailwind-like 10-step scale (50…900) around a DEFAULT,
 * and attach { DEFAULT, foreground } to satisfy ColorScale.
 *
 * Example:
 *   primary: generateShades('#6366f1', '#FFFFFF')
 */
export function generateShades(
  color: string, // the color you consider the "default" mid color
  foreground: string, // text color to use on top of DEFAULT
  opts?: {
    /** if you pass a different default than `color`, it will anchor the scale there */
    defaultColor?: string;
    /** scale mode; 'lab' is smooth and perceptual, 'lch' is also great */
    mode?: 'lab' | 'lch';
    /** if you want us to compute a readable foreground when none is provided */
    autoForegroundIfEmpty?: boolean;
  },
): {
  // This shape conforms to your ColorScale type
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  DEFAULT: string;
  foreground: string;
} {
  const mode = opts?.mode ?? 'lab';

  // Anchor the scale on DEFAULT (falls back to `color`)
  const defaultHex = normalize(opts?.defaultColor ?? color, '#000000');

  // If you *really* want auto-foreground when argument is blank:
  let fg = foreground?.trim();
  if (!fg && opts?.autoForegroundIfEmpty) {
    const lum = chroma(defaultHex).luminance();
    fg = lum > 0.4 ? '#000000' : '#FFFFFF';
  }
  const foregroundHex = normalize(fg || '#000000', '#000000');

  // Smooth lightness-corrected white → DEFAULT → black ramp
  const scale = chroma
    .scale(['#ffffff', defaultHex, '#000000'])
    .mode(mode)
    .correctLightness(true)
    .colors(10); // returns 10 hex strings

  // Map into the labeled object
  const out: any = {
    DEFAULT: defaultHex,
    foreground: foregroundHex,
  };

  SHADE_LABELS.forEach((label, i) => {
    out[label] = scale[i];
  });

  // Force exact middle match: 500 === DEFAULT
  out[500] = defaultHex;

  return out as {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    DEFAULT: string;
    foreground: string;
  };
}

/* Optional tiny helper if you ever want an automatic readable text color */
export function readableText(onHex: string): '#000000' | '#FFFFFF' {
  try {
    return chroma(onHex).luminance() > 0.4 ? '#000000' : '#FFFFFF';
  } catch {
    return '#000000';
  }
}
