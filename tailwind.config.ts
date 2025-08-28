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
            primary: generateShades(light.blueNcs, light.antiflashWhite),
            secondary: generateShades(light.antiflashWhite, light.black),
            success: generateShades(light.castletonGreen, light.antiflashWhite),
            warning: generateShades(light.amber, light.antiflashWhite),
            danger: generateShades(light.indianRed, light.antiflashWhite),
            content1: {
              DEFAULT: light.antiflashWhite,
            },
            content2: {
              DEFAULT: light.antiflashWhite,
            },
            content3: {
              DEFAULT: light.antiflashWhite,
            },
            content4: {
              DEFAULT: light.antiflashWhite,
            },
            background: light.platinum,
            foreground: dark.richBlack2,
            focus: light.blueNcs,
            overlay: dark.richBlack2,
          },
        },
        dark: {
          colors: {
            primary: generateShades(light.blueNcs, dark.whiteSmoke, { darkMode: true }),
            default: generateShades(dark.gunmetal, dark.whiteSmoke, { darkMode: true }),
            secondary: generateShades(dark.gunmetal, dark.whiteSmoke, { darkMode: true }),
            success: generateShades(dark.midnightGreen, dark.whiteSmoke, { darkMode: true }),
            warning: generateShades(dark.caramel, dark.whiteSmoke, { darkMode: true }),
            danger: generateShades(dark.imperialRed, dark.whiteSmoke, { darkMode: true }),
            content1: {
              DEFAULT: dark.gunmetal,
            },
            content2: {
              DEFAULT: dark.gunmetal,
            },
            content3: {
              DEFAULT: dark.gunmetal,
            },
            content4: {
              DEFAULT: dark.gunmetal,
            },
            background: dark.richBlack,
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
