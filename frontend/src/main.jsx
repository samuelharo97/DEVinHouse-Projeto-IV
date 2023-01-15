import { AuthProvider, ThemeContextProvider } from '@contexts';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
