import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import UserPage from './pages/Products';
import LoginPage from './pages/LoginPage';

import ProductsPage from './pages/Categories';
import DashboardAppPage from './pages/DashboardAppPage';
import CategoryForm from './components/Form/CategoryForm';
import ProductForm from './components/Form/ProductForm';
import HomePage from './pages/user/HomePage';
import UserCategoryPage from './pages/user/UserProductPage';
import UserImageDownload from './pages/user/Carousel/UserImageDownload';
import protectedRoutes from './protectedRoutes';
import userLoginSlice from './slice/loginSlice/userLoginSlice';
import { useSelector } from 'react-redux';
import PageError from './pages/user/PageError';
import EditProductForm from './components/Form/EditProductForm';
import EditCategoryForm from './components/Form/EditCategoryForm';

// ----------------------------------------------------------------------

export default function Router() {
  const {user}=useSelector((state)=>state.login)

  const routes = useRoutes([
   {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/products" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'categoryform', element: <CategoryForm /> },
        { path: 'editcategoryform', element: <EditCategoryForm /> },
        { path: 'productform', element: <ProductForm/>  },
        { path: 'editproductform', element: <EditProductForm/>  },
        { path: 'products', element: <ProductsPage /> },
        { path: 'userpage', element: <HomePage />},
        { path: 'userimgdown/:id', element: <UserImageDownload /> },
        { path: 'usercategorypage/:id', element: <UserCategoryPage /> },
        { path: '/dashboard/*', element: <PageError /> },
         
      ],  
    },
   
    //  { path: '/login', element: <LoginPage /> },
    {
      path: 'login',
      element: <LoginPage />,
     
    },
    
    {
      element: <SimpleLayout />,
      children: [{ element: <Navigate to="/dashboard/products"/>, index: true }],
    },
    { path: 'userpage', element: <HomePage /> },
    { path: 'userimgdown/:id', element: <UserImageDownload /> },
    { path: 'usercategorypage/:id', element: <UserCategoryPage /> },
    { path: '*', element: <PageError /> },
  ]);
 
  return routes;
}