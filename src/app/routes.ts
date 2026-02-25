import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { Home } from './components/Home';
import { Contact } from './components/Contact';
import { AdminDashboard } from './components/AdminDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: 'admin',
        Component: AdminDashboard,
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
  },
});