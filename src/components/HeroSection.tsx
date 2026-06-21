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
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${speaking ? 'opacity-100 scale-105' : 'opacity-40 scale-100'}`}
      >
        <source src="/My_Intro.webm" type="video/webm" />
      </video>

      {/* Cinematic gradient overlays that react to voice */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${speaking ? 'bg-gradient-to-r from-black/60 via-transparent to-black/40' : 'bg-gradient-to-r from-black/80 via-black/50 to-black/60'}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

      {/* Animated glowing orbs & tech grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_60%)]" style={{ animation: 'floatOrb 15s ease-in-out infinite' }} />
        <div className="absolute bottom-[10%] right-[10%] h-[1000px] w-[1000px] translate-x-1/4 translate-y-1/4 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_60%)]" style={{ animation: 'floatOrb 18s ease-in-out infinite reverse' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top bar */}
        <FadeIn delay={0} y={-20} className="absolute top-6 sm:top-10 inset-x-0 z-50 flex items-center w-full px-6 md:px-12">
          {/* Animated Left Spacer for Centering -> Left alignment */}
          <div className={`transition-all duration-[1200ms] ease-in-out ${speaking ? 'w-0 flex-none' : 'flex-1'}`} />
          
          {/* Content Wrapper */}
          <div className={`flex items-center transition-all duration-[1200ms] ease-in-out ${speaking ? 'gap-0' : 'gap-4 sm:gap-6'}`}>
            {/* Portfolio Badge */}
            <div className={`overflow-hidden transition-all duration-[1200ms] ease-in-out flex items-center ${speaking ? 'max-w-0 opacity-0 scale-75' : 'max-w-[300px] opacity-100 scale-100'}`}>
              <div className="w-max inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-white/90">
                  Portfolio · 2026
                </p>
              </div>
            </div>

            {/* Floating Glassmorphic Navbar */}
            <nav className={`inline-flex items-center rounded-full border border-white/10 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-[1200ms] ease-in-out hover:bg-[#0A0A0A]/80 hover:border-white/30 ${speaking ? 'bg-[#0A0A0A]/20 px-6 py-3 opacity-60 hover:opacity-100' : 'bg-[#0A0A0A]/60 px-8 py-3.5 sm:px-12 sm:py-4 opacity-100'}`}>
              <ul className={`flex items-center transition-all duration-[1200ms] ease-in-out ${speaking ? 'gap-6 sm:gap-8' : 'gap-8 sm:gap-14'}`}>
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group relative text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:text-white whitespace-nowrap"
                    >
                      {link.label}
                      <span className={`absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-full shadow-[0_0_15px_rgba(255,255,255,0.9)] ${speaking ? 'hidden' : 'block'}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Right Spacer for Centering */}
          <div className="flex-1" />
        </FadeIn>

        {/* Middle-left: PORTFOLIO + Name + Subtitle */}
        <div className="flex flex-1 items-center pt-8 sm:pt-12 md:pt-16">
          <div className="w-full max-w-7xl px-6 md:px-10">
            <FadeIn delay={0.65} y={30}>
              <h1
                className={`mt-4 sm:mt-6 md:mt-8 text-white uppercase tracking-tight leading-[0.95] break-words [text-shadow:0_0_40px_rgba(255,255,255,0.15)] transition-all duration-1000 origin-left ${speaking ? 'scale-[0.4] sm:scale-[0.5] font-light opacity-50 pointer-events-none' : 'scale-100 font-extrabold opacity-100'}`}
                style={{ fontSize: 'clamp(2.25rem, 7vw, 120px)' }}
              >
                <ScrambleText text="Muhammad Taha Nawab" delay={0.8} />
              </h1>
            </FadeIn>

            <FadeIn delay={0.85} y={20}>
              <p className="mt-5 md:mt-7 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#E2E8F0] [text-shadow:0_0_20px_rgba(255,255,255,0.3)]">
                Full-Stack Developer · AI/ML Engineer
              </p>
            </FadeIn>

            <FadeIn delay={1.0} y={20}>
              <div className="mt-8 md:mt-10">
                <a
                  href="/Muhammad_Taha_Nawab_CV.pdf"
                  download="Muhammad_Taha_Nawab_CV.pdf"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white/50 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"></span>
                  <svg className="relative z-10" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span className="relative z-10">Download CV</span>
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







