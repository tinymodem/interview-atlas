/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"PingFang SC"', '"Source Han Sans CN"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
      colors: {
        nc: {
          green: '#32ca99',
          'green-light': '#eefaf7',
          'green-dark': '#25bb9b',
          bg: '#f7f8f9',
          card: '#ffffff',
          border: '#ddd',
          text: '#333',
          'text-light': '#717171',
          'text-muted': '#999',
        },
      },
    },
  },
  plugins: [],
};
