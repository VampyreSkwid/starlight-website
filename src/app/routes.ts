import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { Home } from './components/Home';
import { Contact } from './components/Contact';

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
    ],
  },
], {
  future: {
    v7_startTransition: true,
  },
});