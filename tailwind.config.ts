import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        english: ["Outfit", "sans-serif"],
      },
      colors: {
       darkGray:"#1A1A1A",
       DarkCharcol:"#1E1E1E",
       deepBlack:"#121212",
       primary: '#99CA3C',
        'primary-hover': '#85b032',
        'primary-light': '#e9f5d5',
        'primary-dark': '#1a2e05',
        
        // Text colors
        'heading': '#1a1a1a',
        'paragraph': '#404040',
        
        // Backgrounds
        'base-bg': '#ffffff',
        'sidebar-bg': '#f8fafc',
        'table-header-bg': '#f1f5f9',
        'table-row-hover': '#f8fafc',
        
        // Borders
        'border-default': '#e2e8f0',
        
        // States
        'success': '#99CA3C',
        'warning': '#eab308',
        'error': '#dc2626'
      },
    },
  },
  plugins: [],
} satisfies Config;
