import { createTheme, colorsTuple } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'mainColor',
  defaultRadius: 'md',
    colors: {
      mainColor: colorsTuple('var(--mantine-color-lime-5)'),
      
    },
    fontFamily: "\"Poppins\", ui-sans-serif, system-ui, sans-serif"
});
