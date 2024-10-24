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

        // Gray Scale
        'gray-black': '#000000',
        'gray-01': '#1C1C1E',
        'gray-02': '#39393B',
        'gray-03': '#4F4F51',
        'gray-04': '#7B7B7C',
        'gray-05': '#A7A7A8',
        'gray-06': '#d3d3d3',
        'gray-07': '#E9E9E9',
        'gray-08': '#F4F4F4',
        'gray-09': '#FAFAFA',
        'gray-white': '#FFFFFF',

        // Iris Purple
        'purple-01': '#4C1ECD',
        'purple-02': '#6634F3',
        'purple-03': '#8A64F5',
        'purple-04': '#DDD1FE',
        'purple-05': '#F9F7FF',

        // Milky Sky
        'sky-01': '#1D93B5',
        'sky-02': '#4DB2CF',
        'sky-03': '#81CEE4',
        'sky-04': '#CCE8F0',
        'sky-05': '#E2EFF3',

        // Context
        'context-border': '#E3DDF3',
        'context-bg': '#EFF0F1',
        'context-placeholder': '#D6CCF5',
        'context-error': '#FF2828',
        'context-success': '#0FC478',
        'context-link': '#1882FF',
        'context-notice': '#FA3B83',

        // Dimmed
        'dimmed-90': 'rgba(0, 0, 0, 0.9)',
        'dimmed-70': 'rgba(0, 0, 0, 0.7)',
        'dimmed-50': 'rgba(0, 0, 0, 0.5)',
        'dimmed-30': 'rgba(0, 0, 0, 0.3)',
        'dimmed-20': 'rgba(0, 0, 0, 0.2)',
        'dimmed-10': 'rgba(0, 0, 0, 0.1)',
        'dimmed-5': 'rgba(0, 0, 0, 0.05)',
        'dimmed-blue80': 'rgba(16, 18, 49, 0.8)',
        'dimmed-blue70': 'rgba(16, 18, 49, 0.7)',
        'dimmed-blue60': 'rgba(16, 18, 49, 0.6)',
        'dimmed-blue50': 'rgba(16, 18, 49, 0.5)',
        'dimmed-blue20': 'rgba(16, 18, 49, 0.2)',
        'dimmed-blue10': 'rgba(16, 18, 49, 0.1)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1.5s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
