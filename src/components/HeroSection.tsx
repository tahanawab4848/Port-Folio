import { useState, useEffect, useRef } from 'react';
import FadeIn from './FadeIn';
import ScrambleText from './ScrambleText';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [speaking, setSpeaking] = useState(false);
  // Auto-mute video when scrolling past hero
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const v = videoRef.current;
          if (v && !v.muted) {
            v.muted = true;
            setSpeaking(false);
          }
        }
      },
      { threshold: 0, rootMargin: '-50% 0px 0px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Snap-scroll: one wheel tick / keypress while at top → jump to About
  useEffect(() => {
    let fired = false;

    const goToAbout = () => {
      if (fired) return;
      fired = true;
      const about = document.getElementById('about');
      if (about) about.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    const onWheel = (e: WheelEvent) => {
      if (fired) return;
      if (e.deltaY <= 0) return;
      if (window.scrollY > 50) return;
      e.preventDefault();
      goToAbout();
    };

    const onKey = (e: KeyboardEvent) => {
      if (fired) return;
      if (window.scrollY > 50) return;

      // Prevent scroll jump if the user is typing in an input (like the AI chat)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToAbout();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const toggleSpeech = () => {
    if (!videoRef.current) return;

    if (speaking) {
      videoRef.current.muted = true;
      setSpeaking(false);
    } else {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay with sound blocked by browser:', err);
        videoRef.current!.muted = true;
        setSpeaking(false);
      });
      setSpeaking(true);
    }
  };

  return (
    <section ref={sectionRef} className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-black">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setSpeaking(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${speaking ? 'opacity-100 scale-105' : 'opacity-80 scale-100'}`}
      >
        <source src="/My_Intro.webm" type="video/webm" />
      </video>

      {/* Cinematic gradient overlays that react to voice */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${speaking ? 'bg-black/40' : 'bg-black/10'}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />

      {/* Animated glowing orbs & tech grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(16,185,129,0.08)_0%,transparent_60%)]" style={{ animation: 'floatOrb 15s ease-in-out infinite' }} />
        <div className="absolute bottom-[10%] right-[10%] h-[1000px] w-[1000px] translate-x-1/4 translate-y-1/4 bg-[radial-gradient(circle,rgba(6,182,212,0.06)_0%,transparent_60%)]" style={{ animation: 'floatOrb 18s ease-in-out infinite reverse' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top bar */}
        <div className={`absolute inset-x-0 z-50 w-full pointer-events-none transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${speaking ? 'top-4 sm:top-6' : 'top-6 sm:top-8'}`}>
          <FadeIn delay={0} y={-20}>
            <div className="relative mx-auto flex items-center justify-center w-full h-10 pointer-events-auto">
              
              {/* Highly Refined Integrated Navbar */}
              <nav className={`absolute transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center rounded-full border border-white/5 bg-transparent backdrop-blur-sm shadow-sm px-5 py-0.5 sm:px-8 sm:py-1 ${speaking ? 'left-4 sm:left-6 md:left-8 lg:left-10 translate-x-0 scale-[0.85] opacity-60 hover:opacity-100 origin-top-left' : 'left-1/2 -translate-x-1/2 scale-100 opacity-100 origin-top'}`}>
              
              {/* Integrated Badge */}
              <div className={`overflow-hidden transition-all duration-[1000ms] ease-in-out flex items-center ${speaking ? 'max-w-0 opacity-0 px-0' : 'max-w-[200px] opacity-100 px-5 sm:px-6 border-r border-white/10 mr-1 sm:mr-2'}`}>
                <span className="relative flex h-2 w-2 mr-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span className="text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.25em] text-white/90 whitespace-nowrap">
                  Taha Nawab
                </span>
              </div>

              <ul className="flex items-center gap-1 sm:gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group relative flex items-center justify-center px-6 py-1.5 sm:px-9 sm:py-1.5 rounded-full text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.15em] text-[#A0AEC0] transition-colors duration-300 hover:text-white"
                    >
                      <span className="relative z-10">{link.label}</span>
                      
                      {/* Minimalist Pill Hover */}
                      <span className="absolute inset-0 rounded-full bg-white/[0.06] opacity-0 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </FadeIn>
      </div>

        {/* Middle-left: PORTFOLIO + Name + Subtitle */}
        <div className="flex flex-1 items-center pt-8 sm:pt-12 md:pt-16 pointer-events-none">
          <div className="w-full max-w-7xl px-6 md:px-10 pointer-events-auto">
            <FadeIn delay={0.65} y={30}>
              <h1
                className={`mt-4 sm:mt-6 md:mt-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 uppercase tracking-tight leading-[0.95] break-words drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-1000 origin-left ${speaking ? 'scale-[0.4] sm:scale-[0.5] font-light opacity-50 pointer-events-none' : 'scale-100 font-black opacity-100'}`}
                style={{ fontSize: 'clamp(2.5rem, 8.5vw, 150px)' }}
              >
                <ScrambleText text="Muhammad Taha Nawab" delay={0.8} />
              </h1>
            </FadeIn>

            <FadeIn delay={0.85} y={20}>
              <div className="mt-5 md:mt-6 flex items-center gap-4">
                <div className="h-[1px] w-8 sm:w-12 bg-green-500/50" />
                <p className="text-[9px] sm:text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  Full-Stack Developer <span className="mx-2 text-white/20">|</span> AI/ML Engineer
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={1.0} y={20}>
              <div className="mt-8 md:mt-12">
                <a
                  href="/Muhammad_Taha_Nawab_CV.pdf"
                  download="Muhammad_Taha_Nawab_CV.pdf"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-2.5 sm:px-6 sm:py-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"></span>
                  <svg className="relative z-10 text-white/70 group-hover:text-white transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span className="relative z-10 text-white/90 group-hover:text-white transition-colors">Download Resume</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="grid grid-cols-3 items-end px-6 md:px-10 pb-7 sm:pb-10 md:pb-12 w-full">
          {/* Scroll indicator (Left) */}
          <FadeIn delay={1.1} y={20} className="flex justify-start">
            <a href="#about" aria-label="Scroll to next section" className="group flex flex-col items-center gap-3">
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 transition group-hover:text-white">
                Scroll
              </span>
              <div className="relative h-12 w-px overflow-hidden bg-white/20">
                <span
                  className="absolute inset-x-0 top-0 h-1/2 w-full bg-white"
                  style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
                />
              </div>
            </a>
          </FadeIn>

          {/* TTS toggle (Center) */}
          <FadeIn delay={1.1} y={20} className="flex justify-center pb-2">
            <button
              onClick={toggleSpeech}
              aria-label={speaking ? 'Stop speaking' : 'Speak intro'}
              className="group relative flex items-center justify-center rounded-full border border-white/10 bg-[#0A0A0A]/90 w-10 h-10 sm:w-12 sm:h-12 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all hover:border-white/30 hover:bg-white/10 hover:scale-105"
            >
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-white/10 to-white/5 blur-md opacity-0 transition-opacity group-hover:opacity-100" />

              {speaking ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5 ml-1">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </FadeIn>

          {/* Spacer to balance grid (Right) */}
          <div className="flex justify-end pointer-events-none" />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes floatAvatar {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes floatOrb {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;







