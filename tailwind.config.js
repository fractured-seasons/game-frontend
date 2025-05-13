/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixelify: ['"Pixelify Sans"', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.yellow.200'),
            h1: {
              color: theme('colors.yellow.400'),
            },
            h2: {
              color: theme('colors.yellow.300'),
            },
            h3: {
              color: theme('colors.yellow.500'),
            },
            a: {
              color: theme('colors.yellow.400'),
              '&:hover': {
                color: theme('colors.yellow.500'),
              },
            },
            code: {
              color: theme('colors.yellow.500'),
              backgroundColor: theme('colors.gray.800'),
            },
            pre: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.yellow.800'),
            },
            p: {
              color: theme('colors.yellow.200'),
            },
            strong: {
              fontWeight: 'bold',
              color: theme('colors.yellow.500'),
            },
            em: {
              fontStyle: 'italic',
              color: theme('colors.yellow.400'),
            },
            u: {
              textDecoration: 'underline',
              color: theme('colors.yellow.300'),
            },
            ol: {
              color: theme('colors.yellow.200'),
              listStyleType: 'decimal',
            },
            ul: {
              color: theme('colors.yellow.200'),
              listStyleType: 'disc',
            },
            li: {
              marginBottom: '0.5rem',
            },
            blockquote: {
              borderLeft: `4px solid ${theme('colors.yellow.400')}`,
              color: theme('colors.yellow.200'),
              paddingLeft: '1rem',
              fontStyle: 'italic',
              margin: '1rem 0',
            },
            img: {
              maxWidth: '100%',
              height: 'auto',
            },
            '.ql-align-left': {
              textAlign: 'left',
            },
            '.ql-align-center': {
              textAlign: 'center',
            },
            '.ql-align-right': {
              textAlign: 'right',
            },
            '.ql-clean': {
              color: theme('colors.red.600'),
              cursor: 'pointer',
            },
            '.ql-color': {
              color: theme('colors.yellow.500'),
            },
            '.ql-background': {
              backgroundColor: theme('colors.yellow.300'),
            },
          },
        },
      }),
      // Custom margin and button styles
      spacing: {
        'editor': '2rem',
      },
      button: {
        'editor': 'bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}