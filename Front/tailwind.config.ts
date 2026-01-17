import type { Config } from 'tailwindcss';

const theme = {
  colors: {
    default: {
      theme_color: {
        primary: '#2ba283',
        body: '#fff',
        border: '#e1e1e1',
        theme_light: '#f2f2f2',
        theme_dark: '#1a202c',
      },
      text_color: {
        default: '#555',
        dark: '#222',
        light: '#999',
      },
    },
    darkmode: {
      theme_color: {
        primary: '#059669',
        body: '#111',
        border: '#636363',
        theme_light: '#f4f7f7',
        theme_dark: '#383848',
      },
      text_color: {
        default: '#a4a4a4',
        dark: '#ddd',
        light: '#fff',
      },
    },
  },
  fonts: {
    font_family: {
      primary: 'Raleway',
      primary_type: 'sans-serif',
      secondary: 'Merriweather Sans',
      secondary_type: 'sans-serif',
    },
    font_size: {
      base: '16',
      scale: '1.200',
    },
  },
} as const;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    screens: {
      sm: '540px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        text: theme.colors.default.text_color.default,
        dark: theme.colors.default.text_color.dark,
        primary: theme.colors.default.theme_color.primary,
        body: theme.colors.default.theme_color.body,
        border: theme.colors.default.theme_color.border,
        light: theme.colors.default.text_color.light,
        'theme-light': theme.colors.default.theme_color.theme_light,
        'theme-dark': theme.colors.default.theme_color.theme_dark,
        darkmode: {
          text: theme.colors.darkmode.text_color.default,
          light: theme.colors.darkmode.text_color.light,
          dark: theme.colors.darkmode.text_color.dark,
          primary: theme.colors.darkmode.theme_color.primary,
          body: theme.colors.darkmode.theme_color.body,
          border: theme.colors.darkmode.theme_color.border,
          'theme-light': theme.colors.darkmode.theme_color.theme_light,
          'theme-dark': theme.colors.darkmode.theme_color.theme_dark,
        },
      },
      fontSize: {
        base: '16px',
        h1: '2.074rem',
        'h1-sm': '1.659rem',
        h2: '1.728rem',
        'h2-sm': '1.382rem',
        h3: '1.44rem',
        'h3-sm': '1.152rem',
        h4: '1.2rem',
        h5: '1rem',
        h6: '1rem',
      },
      fontFamily: {
        primary: ['Raleway', 'sans-serif'],
        secondary: ['Merriweather Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),
    require('tailwind-bootstrap-grid')({ generateContainer: false }),
  ],
};

export default config;
