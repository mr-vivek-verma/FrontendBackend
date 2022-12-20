import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import UserPage from './pages/Products';
import LoginPage from './pages/LoginPage';

import ProductsPage from './pages/Categories';
import DashboardAppPage from './pages/DashboardAppPage';
import CategoryForm from './components/CategoryForm/CategoryForm';
import ProductForm from './components/CategoryForm/ProductForm';
import HomePage from './pages/user/HomePage';
import { UserListHead } from './sections/@dashboard/user';
import UserCategoryPage from './pages/user/UserCategoryPage';
import UserImageDownload from './pages/user/Carousel/UserImageDownload';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
           { path: 'categoryform', element: <CategoryForm /> },
         { path: 'productform', element: <ProductForm /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'userpage', element: <HomePage /> },
        { path: 'userimgdown', element: <UserImageDownload /> },
        { path: 'usercategorypage', element: <UserCategoryPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [{ element: <Navigate to="/dashboard/app" />, index: true }],
    },
  ]);

  return routes;
}
