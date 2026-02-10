/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
    ],
    theme: {
        extend: {
            colors: {
                'cyber-black': '#0a0a12',
                'cyber-blue': '#00f0ff',
                'cyber-purple': '#bd00ff',
                'espe-green': '#1B4D3E',
            },
            fontFamily: {
                'tech': ['Roboto', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
