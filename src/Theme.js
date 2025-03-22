import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode, // Dynamically set mode ('light' or 'dark')
      background: {
        default: mode === 'dark' ? '#0a0a0a' : '#ffffff',
        contrastText: mode === 'dark' ? '#fff' : '#000',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000',
        secondary: mode === 'dark' ? '#b0b3b8' : '#5f6368',
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
    shadows: mode === 'dark'
      ? [
          'none',
          '0px 2px 4px rgba(255, 255, 255, 0.1)',
          '0px 4px 8px rgba(255, 255, 255, 0.15)',
          '0px 6px 12px rgba(255, 255, 255, 0.2)',
          '0px 8px 16px rgba(255, 255, 255, 0.3)',
          ...Array(20).fill('0px 10px 20px rgba(255, 255, 255, 0.4)'),
        ]
      : [
          'none',
          '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '0px 4px 8px rgba(0, 0, 0, 0.15)',
          '0px 6px 12px rgba(0, 0, 0, 0.2)',
          '0px 8px 16px rgba(0, 0, 0, 0.3)',
          ...Array(20).fill('0px 10px 20px rgba(0, 0, 0, 0.4)'),
        ],
  });
