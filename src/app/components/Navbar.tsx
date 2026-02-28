import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 rounded-full px-5 md:px-6 py-3 flex items-center justify-between gap-6 md:gap-12 ${scrolled || isOpen
                ? 'bg-brand-primary/95 backdrop-blur-xl border border-brand-dark shadow-2xl w-[95%] md:w-auto'
                : 'bg-transparent w-full md:w-auto md:min-w-[700px] px-6 md:px-16'
                }`}>
                <Link to="/" className="font-bold tracking-widest text-lg md:text-xl uppercase inline-block text-brand-bg hover:text-brand-accent transition-colors shrink-0" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>Starlight</Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-mono text-sm">
                    <a href="/#technology" className="text-brand-bg hover:text-brand-accent transition-colors">Technology</a>
                    <a href="/#markets" className="text-brand-bg hover:text-brand-accent transition-colors">Markets</a>
                    <Link to="/contact" className="text-brand-bg hover:text-brand-accent transition-colors">Contact</Link>
                </div>

                <div className="flex items-center gap-4">
                    <a href="/#reserve" className="hidden md:inline-flex interactive-button px-5 py-2 rounded-full bg-brand-accent text-brand-primary font-semibold text-sm hover:text-brand-bg transition-colors whitespace-nowrap" onClick={() => setIsOpen(false)}>
                        Apply Now
                        <span className="hover-layer"></span>
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-brand-bg hover:text-brand-accent transition-colors p-1"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-[#050508]/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="flex flex-col items-center gap-8 font-mono text-lg text-brand-bg w-full px-8">
                    <a href="/#technology" className="w-full text-center py-4 border-b border-brand-dark/50 hover:text-brand-accent transition-colors" onClick={() => setIsOpen(false)}>Technology</a>
                    <a href="/#markets" className="w-full text-center py-4 border-b border-brand-dark/50 hover:text-brand-accent transition-colors" onClick={() => setIsOpen(false)}>Markets</a>
                    <Link to="/contact" className="w-full text-center py-4 border-b border-brand-dark/50 hover:text-brand-accent transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
                    <a href="/#reserve" className="w-full interactive-button py-4 mt-4 rounded-xl bg-brand-accent text-brand-primary font-bold text-lg hover:text-brand-bg transition-colors text-center" onClick={() => setIsOpen(false)}>
                        Apply Now
                        <span className="hover-layer"></span>
                    </a>
                </div>
            </div>
        </>
    );
}
