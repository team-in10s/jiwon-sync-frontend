import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff9d',
        secondary: '#1a1a1a',
        error: '#ff6b6b',
        'gradient-blue': '#00ccff',
      },
    },
  },
  plugins: [],
};
export default config;
