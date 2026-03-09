import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0b1f3a',
        gold: '#c9a55c'
      }
    }
  },
  plugins: []
};

export default config;
