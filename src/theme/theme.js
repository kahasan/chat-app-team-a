import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Roboto',
  },
  fontSizes: {
    headline: '1.5rem',
    title: '1.125rem',
    subtitle_1: '0.8rem',
    body_1: '1rem',
  },
  sizes: {
    xlarge: '3rem',
    large: '2.18rem',
    medium: '2rem',
    small: '1.5rem',
  },
  colors: {
    purple: '#6445DE',
    purple_53: 'rgba(100, 69, 222, 0.53)',
    gray: '#F8F8F8',
    gray_bg: '#FCFCFC',
    gray_icon: '#8F92A1',
    purple_bg: '#F0EEFC',
    black_subtitle: '#626262',
  },
  space: {},
});

export default theme;
