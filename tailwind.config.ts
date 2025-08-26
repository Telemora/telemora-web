import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';
import { dark, light } from './src/libs/common/constants/colors';
import { generateShades } from './src/libs/common/utils/color';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    borderRadius: {
      DEFAULT: '0.25rem',
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
    },
    extend: {
      fontSize: {
        tiny: '0.65rem',
        small: '0.75rem',
        medium: '1rem',
        large: '1.125rem',
      },
    },
    screens: {
      sm: '320px',
      md: '375px',
      lg: '425px',
      xl: '768px',
    },
    container: {
      screens: {
        sm: '320px',
        md: '375px',
        lg: '425px',
        xl: '768px',
      },
      center: true,
      padding: {
        DEFAULT: '0',
        sm: '1rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
  },
  plugins: [
    heroui({
      layout: {
        lineHeight: {
          small: '1rem',
        },
        radius: {
          small: '0.25rem',
          medium: '0.75rem',
          large: '1rem',
        },
      },
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: generateShades('#1d89c8', light.antiflashWhite),
            secondary: generateShades(light.blueNcs, light.antiflashWhite),
            success: generateShades('#7fd115', light.antiflashWhite),
            warning: generateShades('#f5a524', light.antiflashWhite),
            danger: generateShades('#d14e4e', light.antiflashWhite),
            background: '#f1f1f1',
            foreground: '#000000',
            focus: '#168acd',
            overlay: '#000000',
          },
        },
        dark: {
          colors: {
            primary: generateShades(dark.silverLakeBlue, dark.whiteSmoke, { darkMode: true }),
            default: generateShades(dark.gunmetal, dark.whiteSmoke, { darkMode: true }),
            secondary: generateShades(dark.richBlack, dark.whiteSmoke, { darkMode: true }),
            success: generateShades('#78a70c', dark.whiteSmoke, { darkMode: true }),
            warning: generateShades('#f5a524', dark.whiteSmoke, { darkMode: true }),
            danger: generateShades(dark.imperialRed, dark.whiteSmoke, { darkMode: true }),
            content1: {
              DEFAULT: dark.richBlack2,
            },
            content2: {
              DEFAULT: dark.richBlack,
            },
            content3: {
              DEFAULT: dark.richBlack2,
            },
            content4: {
              DEFAULT: dark.richBlack,
            },
            background: dark.gunmetal,
            foreground: dark.whiteSmoke,
            focus: dark.silverLakeBlue,
            overlay: dark.whiteSmoke,
          },
        },
      },
      defaultTheme: 'dark',
    }),
  ],
} satisfies Config;
