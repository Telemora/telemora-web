const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
      color: {
        background: 'var(--tg-theme-bg-color)',
        foreground: 'var(--tg-theme-text-color)',
        divider: 'var(--tg-theme-section-separator-color)',
        overlay: 'var(--tg-theme-secondary-bg-color)',
        focus: 'var(--tg-theme-link-color)',
        content1: 'var(--tg-theme-bg-color)',
        content2: 'var(--tg-theme-secondary-bg-color)',
        content3: 'var(--tg-theme-section-bg-color)',
        content4: 'var(--tg-theme-section-separator-color)',
        default: 'var(--tg-theme-hint-color)',
        primary: 'var(--tg-theme-button-color)',
        secondary: 'var(--tg-theme-secondary-text-color)',
        success: 'var(--tg-theme-link-color)',
        warning: 'var(--tg-theme-destructive-color)',
        danger: 'var(--tg-theme-destructive-color)',
      },
      textColor: {
        DEFAULT: 'var(--tg-theme-text-color)',
        foreground: 'var(--tg-theme-text-color)',
        primary: 'var(--tg-theme-button-text-color)',
        hint: 'var(--tg-theme-hint-color)',
        subtitle: 'var(--tg-theme-subtitle-text-color)',
        danger: 'var(--tg-theme-destructive-text-color)',
      },
      backgroundColor: {
        DEFAULT: 'var(--tg-theme-bg-color)',
        primary: 'var(--tg-theme-button-color)',
        secondary: 'var(--tg-theme-secondary-bg-color)',
        header: 'var(--tg-theme-header-bg-color)',
        section: 'var(--tg-theme-section-bg-color)',
        bottomBar: 'var(--tg-theme-bottom-bar-bg-color)',
      },
      borderColor: {
        section: 'var(--tg-theme-section-separator-color)',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0',
        sm: '1rem',
        lg: '2rem',
        xl: '3rem',
      },
      screens: {
        sm: '320px',
        md: '375px',
        lg: '425px',
        xl: '768px',
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
      prefix: 'tg',
      addCommonColors: true,
      themes: {
        telegram: {
          // extend: 'var(--tg-color-scheme)',
          layout: {
            disabledOpacity: '0.5',
            fontSize: {
              tiny: '0.75rem',
              small: '0.875rem',
              medium: '1rem',
              large: '1.125rem',
            },
            lineHeight: {
              tiny: '1rem',
              small: '1.25rem',
              medium: '1.5rem',
              large: '1.625rem',
            },
            radius: {
              small: '0.25rem',
              medium: '0.375rem',
              large: '0.65rem',
            },
            hoverOpacity: 0.7,
            dividerWeight: '0.75px',
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
            boxShadow: {
              small: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              medium: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              large: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
          },
          colors: {},
        },
      },
      defaultTheme: 'telegram',
    }),
  ],
};
