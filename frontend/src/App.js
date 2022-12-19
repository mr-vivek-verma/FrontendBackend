// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import Categories from './pages/Categories';
import HomePage from './pages/user/HomePage';
import UserCategoryPage from './pages/user/UserCategoryPage';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      {/* <Categories /> */}
      <HomePage/>
      {/* <UserCategoryPage /> */}
      {/* <Router/> */}
    </ThemeProvider>
  );
}
