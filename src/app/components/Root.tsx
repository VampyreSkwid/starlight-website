import { Link, Outlet } from 'react-router';
import { Footer } from './Footer';
import starfieldBg from '@/assets/ffd952f562c92a4051c79af4bebb1d783d961e39.png';

export function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Starfield background */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: `url(${starfieldBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat-y',
          height: '100%',
          width: '100%'
        }}
      >
        {/* Ambient glow overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(253, 224, 71, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(180, 83, 9, 0.03) 0%, transparent 50%)`
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="w-full border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50 bg-[#020617]/80">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link
                to="/"
                className="text-amber-400 hover:text-amber-300 transition-colors"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                <span className="text-xl font-semibold">Starlight</span>
              </Link>

              <div className="flex gap-8">
                <Link
                  to="/"
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  Home
                </Link>
                <a
                  href="/#reserve"
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                  onClick={(e) => {
                    // If we're already on home page, prevent default and scroll
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                      const element = document.getElementById('reserve');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                >
                  Reserve
                </a>
                <Link
                  to="/contact"
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}