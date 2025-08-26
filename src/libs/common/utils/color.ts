import chroma from 'chroma-js';
import type { ColorScale } from '@heroui/theme';

export const SHADE_LABELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type ShadeLabel = (typeof SHADE_LABELS)[number];

/**
 * Normalizes a color string to a valid 6-digit hex format.
 * @param color The input color string (can be undefined, null, or invalid).
 * @param fallback The color to use if the input is invalid.
 * @returns A valid 6-digit hex color string (e.g., '#ffffff').
 */
function normalizeColor(color: string | undefined | null, fallback: string): string {
  const trimmedColor = (color ?? '').trim();
  return chroma.valid(trimmedColor) ? chroma(trimmedColor).hex() : chroma(fallback).hex();
}

/**
 * Options for configuring the color scale generation.
 */
interface GenerateShadesOptions {
  /** Overrides the main `color` parameter as the central color of the scale. */
  defaultColor?: string;
  /** The color interpolation mode used by chroma.js. Defaults to 'lab'. */
  mode?: 'lab' | 'lch';
  /** If true, automatically selects a black or white foreground if none is provided. */
  autoForegroundIfEmpty?: boolean;
  /** If true, inverts the scale for dark-themed UIs. */
  darkMode?: boolean;
}

/**
 * Generates a 10-step color scale (shades 50-900) from a single base color.
 *
 * @param color The primary color for generating the scale.
 * @param foreground The desired foreground color for text on the primary color.
 * @param options Configuration options for scale generation.
 * @returns A `ColorScale` object containing all shades, a `DEFAULT`, and a `foreground` color.
 */
export function generateShades(
  color: string,
  foreground: string,
  {
    defaultColor,
    mode = 'lab',
    autoForegroundIfEmpty = false,
    darkMode = false,
  }: GenerateShadesOptions = {},
): ColorScale {
  const baseColorHex = normalizeColor(defaultColor ?? color, '#000000');

  let finalForeground = foreground;
  if (!finalForeground?.trim() && autoForegroundIfEmpty) {
    const luminance = chroma(baseColorHex).luminance();
    finalForeground = luminance > 0.4 ? '#000000' : '#FFFFFF';
  }
  const foregroundHex = normalizeColor(finalForeground, '#000000');

  const colorSpectrum = chroma
    .scale(['#ffffff', baseColorHex, '#000000'])
    .mode(mode)
    .correctLightness(true)
    .colors(SHADE_LABELS.length);

  const shades = Object.fromEntries(
    SHADE_LABELS.map((label, index) => {
      const spectrumIndex = darkMode ? SHADE_LABELS.length - 1 - index : index;
      return [label, colorSpectrum[spectrumIndex]];
    }),
  ) as Record<ShadeLabel, string>;

  return {
    ...shades,
    DEFAULT: baseColorHex,
    foreground: foregroundHex,
  };
}
