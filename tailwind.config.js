/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      extend: {
        container: {
          center: true, // Centers the container horizontally
          padding: {
            DEFAULT: "1rem", // Default padding for all breakpoints
            sm: "2rem", // Padding for small screens and up
            lg: "4rem", // Padding for large screens and up
            xl: "5rem", // Padding for auth.vue-large screens and up
          },
        },
      },
    },
  },
  plugins: [],
};
