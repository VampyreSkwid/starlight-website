import { FileText, Shield, CheckCircle2, User, Activity, BarChart4 } from 'lucide-react';

export function FeatureCardShuffler() {
    return (
        <div className="feature-card bg-brand-dark/30 border border-brand-dark rounded-[2rem] p-8 h-[400px] flex flex-col shadow-xl group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <h3 className="text-2xl font-bold mb-3 relative z-10">Continuous Compliance</h3>
            <p className="text-brand-bg/60 mb-8 font-mono text-sm leading-relaxed relative z-10 w-4/5">Patent-pending AI dynamically audits your assets.</p>

            <div className="flex-1 flex items-center justify-center relative z-10">
                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Outer Ring */}
                    <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#2A2A35" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>

                    {/* Middle Arc */}
                    <svg className="absolute inset-2 w-[88%] h-[88%] animate-[spin_8s_linear_infinite_reverse]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#C9A84C" strokeWidth="2" strokeDasharray="60 180" strokeLinecap="round" className="opacity-80" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="10 240" strokeLinecap="round" className="opacity-40" />
                    </svg>

                    {/* Ingesting Documents (z-10 so they go behind the shield) */}
                    <div className="absolute -left-12 z-10 animate-[docFly_4s_ease-in-out_infinite]">
                        <FileText className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -left-16 bottom-4 z-10 animate-[docFly_4s_ease-in-out_infinite_1.3s]">
                        <FileText className="w-8 h-8 text-white" strokeWidth={1} />
                    </div>
                    <div className="absolute -right-12 top-10 z-10 animate-[docFlyRight_4s_ease-in-out_infinite_2.6s]">
                        <FileText className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>

                    {/* Inner Core Shield (z-20 to sit on top of documents) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center animate-[shieldIngest_4s_ease-in-out_infinite] z-20">
                        <div className="relative">
                            {/* Default Shield State */}
                            <Shield className="w-12 h-12 text-brand-accent mb-2 filter drop-shadow-[0_0_8px_rgba(201,168,76,0.6)] animate-[shieldBase_4s_ease-in-out_infinite]" strokeWidth={1.5} />

                            {/* Verified Shield State */}
                            <div className="absolute inset-0 flex items-center justify-center animate-[shieldVerify_4s_ease-in-out_infinite]">
                                <CheckCircle2 className="w-12 h-12 text-green-400 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(74,222,128,0.4)]" strokeWidth={2.5} />
                            </div>
                        </div>

                        {/* Changing Text */}
                        <span className="h-4 flex items-center justify-center">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#00D4FF] animate-[textBase_4s_ease-in-out_infinite] absolute">On-Chain</span>
                            <span className="bg-green-500/20 text-green-400 border border-green-500/50 px-2 py-0.5 rounded font-mono text-[8px] font-bold tracking-widest backdrop-blur-sm drop-shadow-lg animate-[textVerify_4s_ease-in-out_infinite] absolute">VERIFIED</span>
                        </span>
                    </div>

                    {/* Scanning Line */}
                    <div className="absolute top-0 w-full h-0.5 bg-brand-accent/50 filter blur-[1px] animate-[ping_3s_ease-in-out_infinite] z-30"></div>
                </div>

                <style>{`
          @keyframes docFly {
            0% { transform: translate(-40px, 30px) scale(0.9) rotate(-15deg); opacity: 0; filter: blur(0px); }
            20% { opacity: 1; filter: blur(0px); }
            35% { opacity: 1; filter: blur(0px); }
            45% { transform: translate(50px, -5px) scale(0.4) rotate(0deg); opacity: 0; filter: blur(4px); }
            100% { opacity: 0; filter: blur(4px); }
          }
          @keyframes docFlyRight {
            0% { transform: translate(40px, -30px) scale(0.9) rotate(15deg); opacity: 0; filter: blur(0px); }
            20% { opacity: 1; filter: blur(0px); }
            35% { opacity: 1; filter: blur(0px); }
            45% { transform: translate(-50px, 5px) scale(0.4) rotate(0deg); opacity: 0; filter: blur(4px); }
            100% { opacity: 0; filter: blur(4px); }
          }
          @keyframes shieldBase {
            0%, 45%, 95%, 100% { opacity: 1; transform: scale(1); }
            50%, 90% { opacity: 0; transform: scale(0.8); }
          }
          @keyframes shieldVerify {
            0%, 45%, 95%, 100% { opacity: 0; transform: scale(0.8); }
            50%, 90% { opacity: 1; transform: scale(1.1); }
          }
          @keyframes textBase {
            0%, 45%, 95%, 100% { opacity: 1; }
            50%, 90% { opacity: 0; }
          }
          @keyframes textVerify {
            0%, 45%, 95%, 100% { opacity: 0; transform: translateY(5px); }
            50%, 90% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
            </div>
        </div>
    );
}

export function FeatureCardTypewriter() {
    return (
        <div className="feature-card bg-brand-dark/30 border border-brand-dark rounded-[2rem] p-8 h-[400px] flex flex-col shadow-xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00D4FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <h3 className="text-2xl font-bold mb-3 relative z-10">True Liquidity</h3>
            <p className="text-brand-bg/60 mb-8 font-mono text-sm leading-relaxed relative z-10 w-4/5">Actively tradable across institutional pools.</p>

            <div className="flex-1 flex flex-col justify-end relative z-10">
                <div className="flex-1 relative rounded-xl overflow-hidden">

                    {/* Edge Users */}
                    <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-brand-dark/50 p-1.5 rounded-full border border-brand-dark z-10"><User className="w-4 h-4 text-brand-bg/60" /></div>
                    <div className="absolute bottom-2 left-2 bg-brand-dark/50 p-1.5 rounded-full border border-brand-dark z-10"><User className="w-4 h-4 text-brand-bg/60" /></div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-brand-dark/50 p-1.5 rounded-full border border-brand-dark z-10"><User className="w-4 h-4 text-brand-bg/60" /></div>
                    <div className="absolute bottom-2 right-2 bg-brand-dark/50 p-1.5 rounded-full border border-brand-dark z-10"><User className="w-4 h-4 text-brand-bg/60" /></div>
                    <div className="absolute top-1/2 right-1 -translate-y-1/2 bg-brand-dark/50 p-1.5 rounded-full border border-brand-dark z-10"><User className="w-4 h-4 text-brand-bg/60" /></div>

                    {/* Central Starlight Platform Text */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                        <span className="font-mono text-[7px] md:text-[9px] font-bold tracking-[0.2em] text-[#00D4FF] bg-brand-primary/95 px-3 py-1.5 rounded-full border border-[#00D4FF]/30 shadow-[0_0_15px_rgba(0,212,255,0.2)] backdrop-blur-md">STARLIGHT TRADING PLATFORM</span>
                    </div>

                    {/* Central Starlight Platform Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] z-10 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full border border-brand-accent/30 bg-brand-accent/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,212,255,0.15)]">
                            <div className="absolute inset-0 border border-[#00D4FF]/50 animate-[spin_4s_linear_infinite] rounded-full border-t-transparent border-l-transparent border-[2.5px]"></div>
                            <div className="absolute inset-2 border border-[#C9A84C]/60 animate-[spin_3s_linear_infinite_reverse] rounded-full border-b-transparent border-r-transparent border-[1.5px]"></div>
                        </div>
                    </div>

                    {/* Data Lines */}
                    <svg className="absolute inset-0 w-full h-full z-0 opacity-20" preserveAspectRatio="none">
                        {/* Left Center to Hub */}
                        <line x1="16" y1="50%" x2="50%" y2="55%" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4 4" />
                        {/* Bottom Left to Hub */}
                        <line x1="24" y1="calc(100% - 24px)" x2="50%" y2="55%" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4 4" />
                        {/* Bottom Center to Hub */}
                        <line x1="50%" y1="calc(100% - 16px)" x2="50%" y2="55%" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="4 4" />
                        {/* Bottom Right to Hub */}
                        <line x1="calc(100% - 24px)" y1="calc(100% - 24px)" x2="50%" y2="55%" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4 4" />
                        {/* Right Center to Hub */}
                        <line x1="calc(100% - 16px)" y1="50%" x2="50%" y2="55%" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="4 4" />
                    </svg>

                    {/* Moving Inter-User Tokens */}
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[#C9A84C] shadow-[0_0_12px_#C9A84C] animate-[token1_2.5s_linear_infinite] z-20"></div>
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[#00D4FF] shadow-[0_0_15px_#00D4FF] animate-[token2_2.8s_linear_infinite_0.8s] z-20"></div>
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[#C9A84C] shadow-[0_0_12px_#C9A84C] animate-[token3_3.2s_linear_infinite_1.5s] z-20"></div>

                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-brand-bg/50 border-t border-brand-dark pt-4 mt-2">
                    <span>Global Network</span>
                    <span className="text-[#00D4FF] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse"></div> Liquidity Pooling</span>
                </div>

                <style>{`
          @keyframes token1 {
            0% { left: 16px; top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            10% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            45% { left: 50%; top: 55%; transform: translate(-50%, -50%) scale(1.5); }
            55% { left: 50%; top: 55%; transform: translate(-50%, -50%) scale(1.5); }
            90% { left: calc(100% - 24px); top: calc(100% - 24px); opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { left: calc(100% - 24px); top: calc(100% - 24px); opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          }

          @keyframes token2 {
            0% { left: calc(100% - 16px); top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            10% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            45% { left: 50%; top: 55%; transform: translate(-50%, -50%) scale(1.5); }
            55% { left: 50%; top: 55%; transform: translate(-50%, -50%) scale(1.5); }
            90% { left: 24px; top: calc(100% - 24px); opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { left: 24px; top: calc(100% - 24px); opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          }

          @keyframes token3 {
            0% { left: 24px; top: calc(100% - 24px); opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            10% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            45% { left: 50%; top: 55%; transform: translate(-50%, -50%) scale(1.5); }
            55% { left: 50%; top: 55%; transform: translate(-50%, -50%) scale(1.5); }
            90% { left: 50%; top: calc(100% - 16px); opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { left: 50%; top: calc(100% - 16px); opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          }
        `}</style>
            </div>
        </div>
    );
}

export function FeatureCardScheduler() {
    return (
        <div className="feature-card bg-brand-dark/30 border border-brand-dark rounded-[2rem] p-8 h-[400px] flex flex-col shadow-xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <h3 className="text-2xl font-bold mb-3 relative z-10">Capital Access</h3>
            <p className="text-brand-bg/60 mb-8 font-mono text-sm leading-relaxed relative z-10 w-4/5">Instantly unlock trapped value via digital syndication.</p>

            <div className="flex-1 flex flex-col justify-end relative z-10">
                <div className="w-full h-32 relative bg-[#050508] border border-brand-dark rounded-xl overflow-hidden shadow-inner flex-shrink-0 mb-4 flex items-center px-4">

                    {/* Background Grid - Darker */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A35_1px,transparent_1px),linear-gradient(to_bottom,#2A2A35_1px,transparent_1px)] bg-[size:16px_16px] opacity-10"></div>

                    {/* Left: The Physical Asset */}
                    <div className="w-16 h-16 relative flex items-center justify-center shrink-0 z-20 group">
                        {/* Base/Pedestal */}
                        <div className="absolute bottom-2 w-12 h-1 bg-brand-dark rounded-full shadow-[0_0_10px_#C9A84C/20]"></div>

                        {/* Floating Ore/Asset */}
                        <svg className="w-12 h-12 text-[#C9A84C] animate-[float_4s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fillOpacity="0.2" />
                        </svg>

                        {/* Pulse Ring from Asset */}
                        <div className="absolute inset-0 rounded-full border border-[#C9A84C]/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                    </div>

                    {/* Center: The Bi-directional Conduit Bridge */}
                    <div className="flex-1 h-32 relative flex flex-col items-center justify-center mx-2 z-10 py-6">

                        {/* Top Channel: Physical -> Digital (Blue) */}
                        <div className="w-full h-4 relative flex items-center mt-2">
                            <div className="absolute w-full h-[1px] bg-brand-dark shadow-[0_0_5px_rgba(255,255,255,0.05)]"></div>
                            <div className="absolute left-0 w-8 h-[2px] bg-[#00D4FF] shadow-[0_0_15px_#00D4FF] animate-[firePulse_2s_ease-in_infinite]"></div>
                            <div className="absolute left-0 w-4 h-[2px] bg-[#00D4FF] shadow-[0_0_15px_#00D4FF] animate-[firePulse_1.5s_ease-in_infinite_0.8s]"></div>
                            <div className="absolute left-0 w-6 h-[2px] bg-white shadow-[0_0_10px_#ffffff] animate-[firePulse_2.5s_ease-in_infinite_1.5s]"></div>
                        </div>

                        {/* Spacer */}
                        <div className="h-6"></div>

                        {/* Bottom Channel: Global Market -> Capital Return (Gold) */}
                        <div className="w-full h-4 relative flex items-center mb-2">
                            <div className="absolute w-full h-[1px] bg-brand-dark shadow-[0_0_5px_rgba(255,255,255,0.05)]"></div>
                            <div className="absolute right-0 w-12 h-[2px] bg-[#C9A84C] shadow-[0_0_15px_#C9A84C] animate-[firePulseReverse_2.2s_ease-in_infinite_0.2s]"></div>
                            <div className="absolute right-0 w-6 h-[2px] bg-[#C9A84C] shadow-[0_0_15px_#C9A84C] animate-[firePulseReverse_1.8s_ease-in_infinite_1s]"></div>
                        </div>

                    </div>

                    {/* Right: The Global Capital Constellation */}
                    <div className="w-16 h-16 relative flex items-center justify-center shrink-0 z-20 overflow-visible">
                        {/* Receiving Core */}
                        <div className="absolute w-4 h-4 rounded-full bg-brand-dark border border-[#00D4FF]/50 shadow-[0_0_20px_rgba(0,212,255,0.4)] z-30 animate-pulse"></div>

                        {/* Orbiting Capital Nodes */}
                        <div className="absolute inset-[-10px] animate-[spin_8s_linear_infinite]">
                            <div className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"></div>
                            <div className="absolute bottom-4 right-2 w-2 h-2 rounded-full bg-[#C9A84C] shadow-[0_0_10px_#C9A84C]"></div>
                            <div className="absolute top-8 right-0 w-1 h-1 rounded-full bg-white shadow-[0_0_5px_white]"></div>
                        </div>
                        <div className="absolute inset-[-20px] animate-[spin_12s_linear_infinite_reverse]">
                            <div className="absolute bottom-2 left-10 w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]"></div>
                            <div className="absolute top-4 right-8 w-1.5 h-1.5 rounded-full bg-[#C9A84C] shadow-[0_0_8px_#C9A84C]"></div>
                        </div>

                        {/* Expanding Capital Wave (Triggered by pulse) */}
                        <div className="absolute w-full h-full rounded-full border border-[#00D4FF]/20 animate-[capitalWave_2s_ease-out_infinite_1.8s] scale-100"></div>
                        <div className="absolute w-full h-full rounded-full border border-[#C9A84C]/20 animate-[capitalWave_1.5s_ease-out_infinite_2.3s] scale-100"></div>
                    </div>

                    {/* Overlay Metric */}
                    <div className="absolute top-3 right-4 flex items-center gap-2 bg-[#050508]/80 px-2 py-1 rounded border border-brand-dark backdrop-blur-sm z-30">
                        <BarChart4 className="w-3 h-3 text-[#00D4FF]" />
                        <span className="font-mono text-[9px] font-bold text-[#00D4FF] tracking-widest">$16T LIQUIDITY POOL</span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-brand-bg/50 border-t border-brand-dark pt-3">
                    <span>Physical Asset</span>
                    <span className="text-brand-bg/50 flex items-center gap-2">Global Markets <Activity className="w-3 h-3 text-brand-bg/30" /></span>
                </div>

                <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes firePulse {
            0% { left: 0%; opacity: 0; transform: scaleX(0.5); }
            10% { opacity: 1; transform: scaleX(1); }
            90% { opacity: 1; transform: scaleX(2); }
            100% { left: 100%; opacity: 0; transform: scaleX(1); }
          }
          @keyframes firePulseReverse {
            0% { right: 0%; opacity: 0; transform: scaleX(0.5); }
            10% { opacity: 1; transform: scaleX(1); }
            90% { opacity: 1; transform: scaleX(2); }
            100% { right: 100%; opacity: 0; transform: scaleX(1); }
          }
          @keyframes capitalWave {
            0% { transform: scale(0.5); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
          }
        `}</style>
            </div>
        </div>
    );
}
