export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 py-12 px-4 mt-16">
      <div className="container mx-auto max-w-5xl text-center space-y-4">
        <h3 
          className="text-xl text-slate-200"
          style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '0.05em' }}
        >
          Starlight — Real-World Asset Tokenization with On-Chain Compliance
        </h3>
        <div className="text-sm text-slate-400 space-y-2">
          <p>© 2026 Starlight. All rights reserved. Patent pending.</p>
        </div>
      </div>
    </footer>
  );
}