/* eslint-disable @typescript-eslint/no-require-imports */
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '380px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      textColor: {
        primary: 'var(--gray-12)',
        secondary: 'var(--gray-11)',
        tertiary: 'var(--gray-9)',
        brand: 'var(--brand)',
      },
      backgroundColor: {
        primary: 'var(--gray-1)',
        secondary: 'var(--gray-4)',
        secondaryA: 'var(--gray-a4)',
        tertiary: 'var(--gray-3)',
        blur: 'var(--blurBackground)',
      },
      borderColor: {
        primary: 'var(--gray-6)',
        secondary: 'var(--gray-4)',
      },
      ringOffsetColor: {
        primary: 'var(--gray-12)',
      },
      keyframes: {
        in: {
          '0%': { transform: 'translateY(18px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'in-reverse': {
          '0%': { transform: 'translateY(-18px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
        'in-from-right': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'out-from-right': {
          '0%': { transform: 'translateX(0)', opacity: 0 },
          '100%': { transform: 'translateX(100%)', opacity: 1 },
        },
      },
      animation: {
        in: 'in .6s both',
        'in-reverse': 'in-reverse .6s both',
        'in-from-right': 'in-from-right .3s both',
        'out-from-right': 'out-from-right .3s both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ':root': newVars,
  });
}
