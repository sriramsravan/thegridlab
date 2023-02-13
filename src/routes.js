import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import BuildLayout from './layouts/builds';
import SimpleLayout from './layouts/simple';
//
import MainPage from './pages/MainPage';
import MainPageSample from './pages/MainPageSample';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ProtectedRoute from './ProtectedRoute';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    // {
    //   path: '/dashboard',
    //   element: <DashboardLayout />,
    //   children: [
    //     { element: <MainPage />, index: true },
    //     { path: 'app', element: <DashboardAppPage /> },
    //     { path: 'app/:id', element: <DashboardAppPage /> },
    //   ],
    // },
    {
      path: '/builds',
      element: <ProtectedRoute component={BuildLayout} />,
      children: [
        { element: <MainPageSample />, index: true },
        { path: ':id/sessions', element: <MainPage />, index: true },
        { path: ':id/sessions/:sessionId', element: <MainPage />, index: true },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { element: <Navigate to="/builds" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
