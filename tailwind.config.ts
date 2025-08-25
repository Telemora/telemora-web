import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';
import { darkThemeColors, darkThemeShadeColors } from './src/libs/common/constants/colors';
import { getColorNumber } from './src/libs/common/utils/color';

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
            primary: {
              50: '#ddf7ff',
              100: '#b5e1fa',
              200: '#8cccf1',
              300: '#60b7e9',
              400: '#37a3e2',
              500: '#1d89c8',
              600: '#106b9d',
              700: '#044c71',
              800: '#002f47',
              900: '#00111d',
              foreground: '#ffffff',
              DEFAULT: '#1d89c8',
            },
            default: {
              50: '#f2f2f2',
              100: '#d9d9d9',
              200: '#bfbfbf',
              300: '#a6a6a6',
              400: '#8c8c8c',
              500: '#737373',
              600: '#595959',
              700: '#404040',
              800: '#262626',
              900: '#121212',
            },
            secondary: {
              50: '#ddf7ff',
              100: '#b3e2fd',
              200: '#88cdf5',
              300: '#5bb9ef',
              400: '#30a5e9',
              500: '#168ccf',
              600: '#086da2',
              700: '#004e75',
              800: '#003049',
              900: '#003049',
              foreground: '#fff',
              DEFAULT: '#168ccf',
            },
            success: {
              50: '#f1ffdf',
              100: '#dbf9b4',
              200: '#c5f389',
              300: '#aeef5c',
              400: '#98ea2e',
              500: '#7fd115',
              600: '#62a20c',
              700: '#457407',
              800: '#284601',
              900: '#0a1800',
              foreground: '#000',
              DEFAULT: '#7fd115',
            },
            warning: {
              50: '#fef4e4',
              100: '#fce4bd',
              200: '#fad497',
              300: '#f9c571',
              400: '#f7b54a',
              500: '#f5a524',
              600: '#ca881e',
              700: '#9f6b17',
              800: '#744e11',
              900: '#4a320b',
              foreground: '#000',
              DEFAULT: '#f5a524',
            },
            danger: {
              50: '#fee1eb',
              100: '#fbb8cf',
              200: '#f98eb3',
              300: '#f76598',
              400: '#f53b7c',
              500: '#f31260',
              600: '#c80f4f',
              700: '#9e0c3e',
              800: '#73092e',
              900: '#49051d',
              foreground: '#fff',
              DEFAULT: '#d14e4e',
            },
            background: '#f1f1f1',
            foreground: '#000000',
            focus: '#168acd',
            overlay: '#000000',
          },
        },
        dark: {
          colors: {
            primary: {
              ...darkThemeShadeColors.argentinianBlue.reverse().reduce((acc, rgb, i) => {
                const label = getColorNumber(i);
                return { ...acc, [label]: rgb };
              }, {}),
              foreground: darkThemeColors.whiteSmoke,
              DEFAULT: darkThemeColors.silverLakeBlue,
            },
            default: {
              ...darkThemeShadeColors.gunmetal.reverse().reduce((acc, rgb, i) => {
                const label = getColorNumber(i);
                return { ...acc, [label]: rgb };
              }, {}),
              DEFAULT: darkThemeColors.gunmetal,
              foreground: darkThemeColors.whiteSmoke,
            },
            secondary: {
              ...darkThemeShadeColors.richBlack.reverse().reduce((acc, rgb, i) => {
                const label = getColorNumber(i);
                return { ...acc, [label]: rgb };
              }, {}),
              foreground: darkThemeColors.whiteSmoke,
              DEFAULT: darkThemeColors.richBlack,
            },
            success: {
              50: '#f5fede',
              100: '#e5fab3',
              200: '#d5f787',
              300: '#c5f358',
              400: '#b5f02b',
              500: '#9cd714',
              600: '#78a70c',
              700: '#567705',
              800: '#334800',
              900: '#0f1900',
              foreground: darkThemeColors.whiteSmoke,
              DEFAULT: '#78a70c',
            },
            warning: {
              50: '#391C01',
              100: '#774206',
              200: '#90560A',
              300: '#B37210',
              400: '#D69017',
              500: '#F9B120',
              600: '#FBCA57',
              700: '#FDDA78',
              800: '#FEEAA5',
              900: '#FEF6D2',
              foreground: darkThemeColors.whiteSmoke,
              DEFAULT: '#f5a524',
            },
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
