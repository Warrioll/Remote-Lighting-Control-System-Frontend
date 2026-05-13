import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccessGuard from './components/AccesGuard';
import DashboardPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/notFound/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <AccessGuard>
        <DashboardPage />
      </AccessGuard>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
