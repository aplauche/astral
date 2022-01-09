module.exports = {
  // purge: {
  //   enabled: ((process.env.TAILWIND_MODE === 'production') ? true : false),
  //   content: ["./components/**/*.js", "./pages/**/*.js"]
  // },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      title: ['"Playfair Display"', 'serif'],
      mono: ['"IBM Plex Mono"', 'monospace'],
      body: ['"Montserrat"', 'sans-serif'],
    },
    extend: {
      spacing: {
        '0p5r': '0.5rem',
        '1r': '1rem',
        '1p5r': '1.5rem', 
        '2r': '2rem',
        '2p5r': '2.5r',
        '3r': '3rem',
      },
      colors: {
        white: '#fff',
        black: '#1A1A1A',
        dark: '#555555',
        light: '#f5f5f5'
      },
      borderRadius: {
        '0p5r': '0.5rem',
        '1r': '1rem',
        '2r': '2rem',
      }
    }
  },
  corePlugins: {
    container: false,
  }
};
