import { createTheme, colorsTuple } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'mainColor',
  defaultRadius: 'md',
    breakpoints: {
    xxl: '130rem'
    },
  //   xs: '30em',
  //   sm: '48em',
  //   md: '64em',
  //   lg: '74em',
  //   xl: '90em',
  // },
    colors: {
      mainColor: colorsTuple('var(--mantine-color-lime-5)'),
      
    },
    fontFamily: "\"Poppins\", ui-sans-serif, system-ui, sans-serif"
});
