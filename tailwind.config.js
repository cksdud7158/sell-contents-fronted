module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        withoutHeader: "calc(100vh - 4rem)",
        "50vh": "50vh",
        "25vh": "25vh",
        "30vh": "30vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
