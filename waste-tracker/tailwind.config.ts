import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "branco-puro": "#FFFFFF",
        "cinza-claro": "#F8F9FA",
        "azul-marinho": "#1E293B",
        "verde-esmeralda": "#10B981",
        "vermelho-alerta": "#EF4444",
        "amarelo-aviso": "#F59E0B",
      },
    },
  },
  plugins: [],
};
export default config;