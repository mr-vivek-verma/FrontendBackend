// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import Categories from './pages/Categories';
import HomePage from './pages/user/HomePage';
import UserCategoryPage from './pages/user/UserProductPage';
import UserImageDownload from './pages/user/Carousel/UserImageDownload';
import ProductForm from './components/Form/ProductForm';
import CategoryForm from './components/Form/CategoryForm';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
    {/* <ProductForm/>   */}
      {/* <CategoryForm/> */}
      {/* <ScrollToTop /> */}
      {/* <Categories /> */}
      {/* <HomePage/> */}
      {/* <UserImageDownload/>  */}
      <UserCategoryPage />
      <Router/>
      
    </ThemeProvider>
  );
}
