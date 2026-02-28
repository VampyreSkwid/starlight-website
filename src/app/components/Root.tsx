import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Root() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#reserve') {
      setTimeout(() => {
        const element = document.getElementById('reserve');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="relative min-h-screen bg-brand-primary text-brand-bg font-inter overflow-hidden flex flex-col">
      <Navbar />

      <div className="flex-1">
        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}