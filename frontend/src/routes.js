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
import { UserListHead } from './sections/@dashboard/user';
import UserCategoryPage from './pages/user/UserProductPage';
import UserImageDownload from './pages/user/Carousel/UserImageDownload';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/userpage" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
           { path: 'categoryform', element: <CategoryForm /> },
         { path: 'productform', element: <ProductForm/>  },
        { path: 'products', element: <ProductsPage /> },
        { path: 'userpage', element: <HomePage /> },
        { path: 'userimgdown/:id', element: <UserImageDownload /> },
        { path: 'usercategorypage/:id', element: <UserCategoryPage /> },
         
      ],
    },
     { path: '*', element: <LoginPage /> },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [{ element: <Navigate to="/dashboard/userpage" />, index: true }],
    },
  ]);

  return routes;
}