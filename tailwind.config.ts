import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8A22F0',
        'bg': '#E8E8E8',
        'card-bg': '#d1d5db'
      },
      backgroundImage:{
        'login-bg': "url('/login-bg.jpg')"
      },
      boxShadow:{
        'blackShadow': "0 12px 54px -32px rgba(0,0,0,0.35)"
      }
    },
  },
  plugins: [],
}
export default config
