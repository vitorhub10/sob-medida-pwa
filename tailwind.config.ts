import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#2196F3',
        brandGreen: '#4CAF50'
      },
      boxShadow: {
        glass: '0 12px 40px rgba(15, 23, 42, 0.22)'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(33,150,243,0.9), rgba(76,175,80,0.82))'
      }
    }
  },
  plugins: []
};

export default config;
