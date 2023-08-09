import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
  );
  
  // 6. theme.ts에서 만든 테마(darkTheme/lightTheme)를 ThemeProvider에 전달.
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
 
