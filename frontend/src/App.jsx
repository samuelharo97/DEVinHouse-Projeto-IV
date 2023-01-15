import { BrowserRouter } from 'react-router-dom';
import { AppRoutes, AuthRoutes } from '@router';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@styles';
import { Header } from '@components';
import { useAuth, useTheme } from '@contexts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export function App() {
  const { auth } = useAuth();
  const { theme } = useTheme();
  const isAuthenticated = auth;

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header Authenticated={isAuthenticated} />
        <main>{isAuthenticated ? <AppRoutes /> : <AuthRoutes />}</main>
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
}
