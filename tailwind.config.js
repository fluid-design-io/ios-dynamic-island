/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@fluid-design/fluid-ui/dist/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "media",
    theme: {
        extend: {
            fontFamily: {
                inter: ["var(--font-inter)", "sans-serif"],
            },
            fontSize: {
                "2xs": "0.688rem",
            }
        },
    },
    plugins: [
        require("@fluid-design/fluid-ui/dist/plugin/core"), // main plugin
        require("@fluid-design/fluid-ui/dist/plugin/button"), // for button component
    ],
};
