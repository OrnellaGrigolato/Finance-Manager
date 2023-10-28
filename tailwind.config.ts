import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens:{
      'xs': '640px',
      'sm': '1100px',
      'lg': '1100px'
    },
    extend: {
      colors: {
        'primary': '#8A22F0',
        'bg': '#fcfcfc',
        'card-bg': '#ececec'
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
