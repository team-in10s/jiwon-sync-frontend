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
        'gray-06': '#A7A7A8',
        'gray-07': '#E9E9E9',
        'gray-08': '#F4F4F4',
        'gray-09': '#FAFAFA',
        'gray-white': '#FFFFFF',

        // Iris Purple
        'purple-00': '#5B2DDA',
        'purple-01': '#F9F7FF',
        'purple-02': '#DDD1FE',
        'purple-03': '#8A64F5',
        'purple-04': '#6634F3',
        'purple-05': '#4C1ECD',

        // Milky Sky
        'sky-01': '#E2F7F3',
        'sky-02': '#CCE8F0',
        'sky-03': '#81CEE4',
        'sky-04': '#4DB2CF',
        'sky-05': '#1D93B5',

        // Context
        'context-border': '#E3DDF3',
        'context-bg': '#FFF0F1',
        'context-placeholder': '#D6CCF5',
        'context-error': '#FF2828',
        'context-success': '#0FC478',
        'context-link': '#182EF7',
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
    },
  },
  plugins: [],
};
export default config;
