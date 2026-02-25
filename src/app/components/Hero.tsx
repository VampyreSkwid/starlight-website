import starlightLogo from '@/assets/debddd20fddef58470b2fabe2dec4d911b9416f1.png';

export function Hero() {
  return (
    <section className="w-full py-16 sm:py-24 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Starlight Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src={starlightLogo}
            alt="Starlight"
            className="w-full max-w-2xl h-auto"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-8">
          <span
            className="text-amber-400 uppercase"
            style={{
              fontSize: '1.125rem',
              letterSpacing: '0.15em',
              lineHeight: '1.5',
              wordSpacing: '0.1em'
            }}
          >
            REAL WORLD ASSET TOKENIZATION
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl mb-8 text-slate-50 leading-tight"
          style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '0.02em' }}
        >Unlock New Capital Markets for Your Mining Assets</h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">Starlight digitizes royalties, mineral resources, and other real world assets. Our patent pending on-chain compliance auditing system enables a new constellation of regulatory compliant tokenized securities.</p>
      </div>
    </section>
  );
}