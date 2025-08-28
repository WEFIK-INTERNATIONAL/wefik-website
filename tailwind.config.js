/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                neue: ["var(--font-neue)", "Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
