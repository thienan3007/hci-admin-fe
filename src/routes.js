import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import VoucherDetail from './pages/VoucherDetail';
import Vouchers from './pages/Vouchers';
import VoucherCreate from './pages/VoucherCreate';
import BrandInfo from './pages/BrandInfo';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products />, children: [{ path: 'voucher-detail', element: <VoucherDetail /> }] },
        { path: 'blog', element: <Blog /> },
        { path: 'voucher-detail', element: <VoucherDetail /> },
        { path: 'vouchers', element: <Vouchers /> },
        { path: 'voucher-create', element: <VoucherCreate /> },
        { path: 'brand-info', element: <BrandInfo /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '/vouchers',
    //   element: <Products />,
    //   children: [{ path: '/voucher-detail', element: <Navigate to="/dashboard/app" /> }],
    // },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
