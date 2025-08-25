import chroma, { Color } from 'chroma-js';

/**
 * Maps as described in your doc
 * - 10 steps each
 */
export const LIGHTNESS_MAP: number[] = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15, 0.05];

export const SATURATION_MAP: number[] = [0.32, 0.16, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.16, 0.32];

export const HUE_MAP: number[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36];

/** Tailwind-like labels for convenience */
export const SHADE_LABELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type ShadeLabel = (typeof SHADE_LABELS)[number];

export type PaletteKind = 'base' | 'hueUp' | 'hueDown';

export type GeneratedPalette = {
  /** Original user input normalized */
  input: string;
  /** Base shades (light → dark) */
  base: Color[];
  /** Hue shifted slightly higher (relative) */
  hueUp: Color[];
  /** Hue shifted slightly lower (relative) */
  hueDown: Color[];
  /** Index in maps closest to base color lightness (0–9) */
  baseIndex: number;
};

export type GeneratedBasePalette = {
  /** Original user input normalized */
  input: string;
  /** Base shades (light → dark) */
  base: Color[];
  /** Index in maps closest to base color lightness (0–9) */
  baseIndex: number;
};

/**
 * Safely turn a string into a chroma Color.
 */
export function getUserColorChroma(colorString: string, fallback = '#000000'): Color {
  const str = (colorString ?? '').trim();
  return chroma.valid(str) ? chroma(str) : chroma(fallback);
}

/**
 * Find the closest LIGHTNESS_MAP index for a color.
 */
export function getBaseIndexForLightness(c: Color): number {
  const lTarget = clamp01(c.get('hsl.l'));
  let minDiff = Number.POSITIVE_INFINITY;
  let idx = 0;
  for (let i = 0; i < LIGHTNESS_MAP.length; i++) {
    const diff = Math.abs(LIGHTNESS_MAP[i] - lTarget);
    if (diff < minDiff) {
      minDiff = diff;
      idx = i;
    }
  }
  return idx;
}

/**
 * Generate the 10 base colors by applying LIGHTNESS_MAP, then adjust saturation
 * relative to the baseIndex using SATURATION_MAP.
 */
export function makeBaseShades(user: Color, baseIndex: number): Color[] {
  const withLightness = LIGHTNESS_MAP.map((l) => user.set('hsl.l', clamp01(l))).map((c) =>
    chroma(c),
  );

  return withLightness.map((c, i) => {
    const delta = SATURATION_MAP[i] - SATURATION_MAP[baseIndex];
    return delta >= 0 ? c.saturate(delta) : c.desaturate(-delta);
  });
}

/**
 * Shift hues upward relative to baseIndex (positive direction).
 */
export function makeHueUpShades(baseShades: Color[], baseIndex: number): Color[] {
  return baseShades.map((c, i) => {
    const delta = HUE_MAP[i] - HUE_MAP[baseIndex];
    const shift = delta >= 0 ? delta : (Math.abs(delta) / 2) * -1;
    return c.set('hsl.h', `+${shift}`);
  });
}

/**
 * Shift hues downward relative to baseIndex (negative direction).
 */
export function makeHueDownShades(baseShades: Color[], baseIndex: number): Color[] {
  return baseShades.map((c, i) => {
    const delta = HUE_MAP[i] - HUE_MAP[baseIndex];
    const shift = delta >= 0 ? -delta : Math.abs(delta) / 2;
    return c.set('hsl.h', `${shift >= 0 ? '-' : '+'}${Math.abs(shift)}`);
  });
}

/**
 * One-call generator: pass a color string, get all three swatches.
 */
export function generatePalettes(inputColor: string, fallback = '#000000'): GeneratedPalette {
  const user = getUserColorChroma(inputColor, fallback);
  const baseIndex = getBaseIndexForLightness(user);
  const base = makeBaseShades(user, baseIndex);
  const hueUp = makeHueUpShades(base, baseIndex);
  const hueDown = makeHueDownShades(base, baseIndex);

  return { input: user.hex(), base, hueUp, hueDown, baseIndex };
}

/**
 * One-call generator: pass a color string, get all three swatches.
 */
export function generateBasePalettes(
  inputColor: string,
  fallback = '#000000',
): GeneratedBasePalette {
  const user = getUserColorChroma(inputColor, fallback);
  const baseIndex = getBaseIndexForLightness(user);
  const base = makeBaseShades(user, baseIndex);

  return { input: user.hex(), base, baseIndex };
}

/** Convenience: turn Color[] into hex strings */
export const toHex = (arr: Color[]) => arr.map((c) => c.hex());

/** Convenience: rgba strings with optional alpha */
export const toRGBA = (arr: Color[], alpha = 1) =>
  arr.map((c) => {
    const [r, g, b] = c.rgb();
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  });

/** map an index (0–9) to a shade label (50…900) */
export function getColorNumber(i: number): ShadeLabel {
  return SHADE_LABELS[Math.max(0, Math.min(SHADE_LABELS.length - 1, i))];
}

/** hex -> contrast color (black/white) for legible text */
export function getReadableText(hex: string): '#000000' | '#FFFFFF' {
  try {
    const l = chroma(hex).luminance();
    return l > 0.4 ? '#000000' : '#FFFFFF';
  } catch {
    return '#000000';
  }
}

/** small helper */
function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}
