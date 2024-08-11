// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'olympic-blue': '#0081C8',
        'olympic-yellow': '#FCB131',
        'olympic-black': '#000000',
        'olympic-green': '#00A651',
        'olympic-red': '#EE334E',
      },
    },
  },
  plugins: [],
}