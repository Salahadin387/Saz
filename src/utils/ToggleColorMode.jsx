import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

function ToggleColorMode({ children }) {
  const [mode, setMode] = useState('light');

  const toggleColorMode = useMemo(
    () => () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')),
    []
  );

  const theme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode],
  );

  const contextValue = useMemo(
    () => ({ mode, toggleColorMode }),
    [mode, toggleColorMode],
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;
