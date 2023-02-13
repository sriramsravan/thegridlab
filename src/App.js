// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

import AuthContextProvider from './context/AuthContext';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </AuthContextProvider>
  );
}
