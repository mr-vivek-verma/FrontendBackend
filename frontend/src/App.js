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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.login);
 
  useEffect(() => {
    !user ? navigate("login") : "";
  },[user])
  
  return (
    <ThemeProvider>
     
      <Router />
      
    </ThemeProvider>
  );
}