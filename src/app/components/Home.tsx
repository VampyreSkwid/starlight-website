import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Activity, BarChart4 } from 'lucide-react';
import { RegistrationForm } from './RegistrationForm';
import { FeatureCardScheduler, FeatureCardShuffler, FeatureCardTypewriter } from './FeatureCards';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation Sequence
      gsap.fromTo('.hero-text',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.hero-btn',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.6 }
      );

      // Philosophy Parallax & Text Reveal
      gsap.to('.philosophy-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.philosophy-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.fromTo('.phil-statement',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.philosophy-section',
            start: 'top 60%',
          }
        }
      );

      // Features Cards Stagger Reveal
      gsap.fromTo('.feature-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 70%',
          }
        }
      );

      // Protocol Sticky Stacking Setup
      const cards = gsap.utils.toArray('.protocol-card') as Element[];
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Don't animate the last card out

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(20px)',
          scrollTrigger: {
            trigger: card,
            start: 'top 15%', // Push the trigger line up higher
            end: '+=600',
            scrub: true,
            pin: true,
            pinSpacing: false,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-brand-primary text-brand-bg font-inter overflow-hidden">
      {/* B. HERO SECTION — "The Opening Shot" */}
      <section className="relative h-[100dvh] w-full flex items-end pb-32 px-8 md:px-16 lg:px-24">
        {/* Background Image with Heavy Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_earth_to_algorithm.png"
            alt="Physical geological asset dissolving into digital constellation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl w-full">
          <h1 className="hero-text text-xl md:text-2xl font-semibold tracking-tight uppercase text-brand-bg/80 mb-2">Earth to Algorithm</h1>
          <h2 className="hero-text text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
            <span className="block font-bold mb-2 text-[#C9A84C]">Physical Assets meet</span>
            <span className="block font-playfair italic text-white pr-0 md:pr-12">Digital Liquidity.</span>
          </h2>
          <p className="hero-text text-lg md:text-xl text-brand-bg/70 max-w-2xl font-mono mb-10 leading-relaxed">
            Transforming illiquid mining royalties and reserves into globally tradable digital assets through <span className="whitespace-nowrap">automated, on-chain compliance.</span>
          </p>
          <a href="#reserve" className="hero-btn interactive-button inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-bg text-brand-primary font-semibold text-lg hover:text-brand-bg">
            Apply to Tokenize
            <ArrowRight size={20} />
            <span className="hover-layer"></span>
          </a>
        </div>
      </section>

      {/* C. FEATURES — "Interactive Functional Artifacts" */}
      <section id="technology" className="features-section relative py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 — Capital Access */}
          <FeatureCardScheduler />

          {/* Card 2 — Continuous Compliance */}
          <FeatureCardShuffler />

          {/* Card 3 — True Liquidity */}
          <FeatureCardTypewriter />
        </div>
      </section>

      {/* D. PHILOSOPHY — "The Manifesto" */}
      <section id="markets" className="philosophy-section relative py-40 overflow-hidden bg-[#050508] border-y border-brand-dark">
        <div className="absolute inset-0 z-0 opacity-10 philosophy-bg">
          <img
            src="/philosophy_shadows.png"
            alt="Abstract architectural luxury dark shadows"
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="phil-statement font-inter text-xl md:text-2xl text-brand-bg/50 mb-6 uppercase tracking-widest">
            We deliver on-chain compliance.
          </p>
          <p className="phil-statement font-playfair italic text-4xl md:text-6xl lg:text-7xl leading-tight">
            You get: <span className="text-brand-accent">Secondary Trading<br /> & Deep Liquidity.</span>
          </p>
        </div>
      </section>

      {/* E. PROTOCOL — "Sticky Stacking Archive" */}
      <section className="relative bg-brand-primary pt-24 pb-48">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <div className="protocol-card h-[85vh] md:h-[80vh] sticky top-[10vh] flex items-center justify-center mb-16 md:mb-24">
            <div className="w-full h-full bg-brand-dark/30 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border border-brand-dark flex flex-col md:flex-row overflow-hidden shadow-2xl">
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center overflow-y-auto">
                <span className="font-mono text-brand-accent mb-4 md:mb-6 text-sm md:text-lg">01. COMPLIANCE</span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6">The Starlight Audit</h3>
                <p className="text-lg md:text-xl text-brand-bg/70 leading-relaxed">
                  Our patent-pending AI engine continuously monitors your corporate documents and regulatory requirements on-chain. Solving the "Oracle Problem" forever.
                </p>
              </div>
              <div className="w-full h-1/3 md:h-full md:w-1/2 bg-brand-dark/50 flex items-center justify-center p-8 md:p-12 shrink-0">
                <Shield className="w-24 h-24 md:w-48 md:h-48 text-brand-accent opacity-80" />
              </div>
            </div>
          </div>

          <div className="protocol-card h-[85vh] md:h-[80vh] sticky top-[10vh] flex items-center justify-center mb-16 md:mb-24">
            <div className="w-full h-full bg-brand-dark/30 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border border-brand-dark flex flex-col md:flex-row overflow-hidden shadow-2xl">
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center overflow-y-auto">
                <span className="font-mono text-brand-accent mb-4 md:mb-6 text-sm md:text-lg">02. LIQUIDITY</span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6">True Secondary Markets</h3>
                <p className="text-lg md:text-xl text-brand-bg/70 leading-relaxed">
                  A built-in "Walled Garden" trading platform with a rigorous 6-step KYC/AML pipeline. Your tokenized mineral rights are actively and compliantly tradable.
                </p>
              </div>
              <div className="w-full h-1/3 md:h-full md:w-1/2 bg-brand-dark/50 flex items-center justify-center p-8 md:p-12 relative overflow-hidden shrink-0">
                <Activity className="w-24 h-24 md:w-48 md:h-48 text-brand-accent opacity-80" strokeWidth={1} />
              </div>
            </div>
          </div>

          <div className="protocol-card h-[85vh] md:h-[80vh] sticky top-[10vh] flex items-center justify-center mb-16 md:mb-24">
            <div className="w-full h-full bg-brand-dark/30 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border border-brand-dark flex flex-col md:flex-row overflow-hidden shadow-2xl">
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center overflow-y-auto">
                <span className="font-mono text-brand-accent mb-4 md:mb-6 text-sm md:text-lg">03. CAPITAL</span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6">Rapid, Non-Dilutive Access</h3>
                <p className="text-lg md:text-xl text-brand-bg/70 leading-relaxed">
                  Instantly unlock trapped value and access a projected $16T pool of institutional capital without diluting company equity. Bypass traditional mining finance.
                </p>
              </div>
              <div className="w-full h-1/3 md:h-full md:w-1/2 bg-brand-dark/50 flex items-center justify-center p-8 md:p-12 shrink-0">
                <BarChart4 className="w-24 h-24 md:w-48 md:h-48 text-brand-accent opacity-80" strokeWidth={1} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* F. FORM SECTION — "Application Gateway" */}
      <RegistrationForm />
    </div>
  );
}