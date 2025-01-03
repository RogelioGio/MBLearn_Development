import { text } from '@fortawesome/fontawesome-svg-core';

/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        ],
  theme: {
    extend: {
        animation:{
            'fade-in-out': 'fade-in-out 25s ease-in-out infinite',
        },
        keyframes:{
            'fade-in-out':{
                '0%, 100%': {opacity: '0'},
                '5%, 95%': {opacity: '1'},
            },
        },
        fontFamily:{
            header: ['var(--headerFont)'],
            text: ['var(--textFont)'],
        },
        colors:{
            primary: 'var(--Primary-Color)',
            primaryhover: 'var(--Primary-Color-Hover)',
            secodary: 'var(--Darker-Primary-Color)',
            tertiary: 'var(--Darker-Unactive-Color)',
            background: 'var(--Background-Color)',
            secondarybackground: 'var(--Secondary-Background-Color)',
            unactive: 'var(--Unactive-Color)',
            white: 'var(--White)',
            black: 'var(--Black)',
            divider: 'var(--Divider)',
        }
    },
  },
  plugins: [],
}

