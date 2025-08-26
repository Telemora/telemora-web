import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';
import { darkThemeColors, darkThemeShadeColors } from './src/libs/common/constants/colors';
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
            primary: generateShades('#1d89c8', '#ffffff'),
            secondary: generateShades('#168ccf', '#ffffff'),
            success: generateShades('#7fd115', '#ffffff'),
            warning: generateShades('#f5a524', '#ffffff'),
            danger: generateShades('#d14e4e', '#ffffff'),
            background: '#f1f1f1',
            foreground: '#000000',
            focus: '#168acd',
            overlay: '#000000',
          },
        },
        dark: {
          colors: {
            primary: generateShades(darkThemeColors.silverLakeBlue, darkThemeColors.whiteSmoke),
            default: generateShades(darkThemeColors.gunmetal, darkThemeColors.whiteSmoke),
            secondary: generateShades(darkThemeColors.richBlack, darkThemeColors.whiteSmoke),
            success: generateShades('#78a70c', darkThemeColors.whiteSmoke),
            warning: generateShades('#f5a524', darkThemeColors.whiteSmoke),
            danger: {
              ...darkThemeShadeColors.imperialRed,
              foreground: darkThemeColors.whiteSmoke,
              DEFAULT: darkThemeColors.imperialRed,
            },
            content1: {
              DEFAULT: darkThemeColors.richBlack2,
            },
            content2: {
              DEFAULT: darkThemeColors.richBlack,
            },
            content3: {
              DEFAULT: darkThemeColors.richBlack2,
            },
            content4: {
              DEFAULT: darkThemeColors.richBlack,
            },
            background: darkThemeColors.gunmetal,
            foreground: darkThemeColors.whiteSmoke,
            focus: darkThemeColors.silverLakeBlue,
            overlay: darkThemeColors.whiteSmoke,
          },
        },
      },
      defaultTheme: 'dark',
    }),
  ],
} satisfies Config;
