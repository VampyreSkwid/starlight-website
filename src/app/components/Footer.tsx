export function Footer() {
  return (
    <footer className="bg-brand-primary pt-24 pb-12 px-8 md:px-16 lg:px-24 font-inter">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-brand-dark pb-16 mb-8">
        <div>
          <h4 className="text-2xl font-bold tracking-tight mb-4 text-white">STARLIGHT</h4>
          <p className="text-brand-bg/50 max-w-sm font-mono text-sm leading-relaxed text-white">
            Unlocking secondary market liquidity for real-world assets through continuous, on-chain compliance.
          </p>
        </div>
        <div>
          <div className="flex items-center gap-3 bg-brand-dark/30 px-5 py-3 rounded-full border border-brand-accent/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#f97316]"></div>
            <span className="font-mono text-xs text-orange-500/90 tracking-widest uppercase font-semibold">System Initializing</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-brand-bg/40 font-mono text-xs text-white">
        <p>© {new Date().getFullYear()} Starlight Financial. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Designed for Scale.</p>
      </div>
    </footer>
  );
}