import type { Config } from "tailwindcss";
import { animation } from "./tailwind-ani";
const defaultTheme = require('tailwindcss/defaultTheme')

const nav= '48px';
const nav_m= '48px';
const side= '240px';
const side_m= '180px';
console.log({...animation})
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      ...animation,
      fontFamily: {
        'sans': ['SUITE', ...defaultTheme.fontFamily.sans],
				'suite': ['SUITE'],
        'type-1': ['HSBombaram21-Regular'],
        'type-2': ['GmarketSans'],
        'type-en': ['Pretendard'],
      },
      fontSize: {
        'title-lg': '128px',
        'title-xl': '168px',
        'title': '96px',
        'title-sm': '82px',
				'2xs': '0.6rem'
			},
      borderColor: {
        DEFAULT: '#333',
      },
      colors:({ theme })=> {
				const { colors }= theme as any;
				// console.log(colors.blueGray['200'])
				return {
					input: '#b0bec5',
					['input-text']: '#607d8b',
          paper: '#f8fdef'
				}
			},
      spacing: {
				'container-sm': '800px',
				'container-md': '1000px',
				'container-ms': '1120px',
				'container': '1280px',
				'container-lg': '1680px',
				'1/8': '12.5%',
				'1/10': '10%',
				'1/3': '33.333333%',
        'screen-1': '1400px',
        'screen-2': '1600px',
				'nav': nav,
				'nav-m': nav_m,
				'dvh-nav': `calc(100dvh - ${nav})`,
				'dvh-nav-m': `calc(100dvh - ${nav_m})`,
				'grid-95dvh': `calc(95dvh - ${nav} - 32px)`,
				'grid-95dvh-m': `calc(95dvh - ${nav} - 32px)`,
				'side': side,
				'side-m': side_m,
			},
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-stroke"), 
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      {
        mytheme: {
          "primary": "#a991f7",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          // 추가 설정...
        },
      }
    ],
  }
} satisfies Config;
