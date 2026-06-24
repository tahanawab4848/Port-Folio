import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn';
import ScrambleText from './ScrambleText';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const HTTP_CODES = [
  "200 OK", 
  "201 CREATED", 
  "202 ACCEPTED", 
  "301 MOVED", 
  "400 BAD REQ", 
  "401 UNAUTH", 
  "403 FORBIDDEN", 
  "404 NOT FOUND", 
  "418 TEAPOT", 
  "500 ERROR", 
  "502 BAD GATE"
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [speaking, setSpeaking] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cycle through HTTP codes
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % HTTP_CODES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  // Attempt to auto-play intro video with sound immediately on page load
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const timer = setTimeout(() => {
      v.muted = false;
      v.currentTime = 0;
      const playPromise = v.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Success! Browser allowed unmuted autoplay
          setSpeaking(true);
        }).catch((err) => {
          // Blocked by browser policies. Fallback to muted.
          console.warn('Autoplay with sound blocked by browser:', err);
          v.muted = true;
          v.play();
          setSpeaking(false);
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
            <div className="relative mx-auto flex items-center justify-between md:justify-center w-full h-10 px-6 md:px-0 pointer-events-auto">
              
              {/* Mobile Header (Hidden on Desktop) */}
              <div className="flex md:hidden items-center justify-between w-full">
                {/* Left: Status Code Badge */}
                <div className="flex items-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md px-3.5 py-1 shadow-sm">
                  <span className="relative flex h-1.5 w-1.5 mr-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-white/95">
                    {HTTP_CODES[statusIndex]}
                  </span>
                </div>

                {/* Right: Hamburger button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white/80 hover:text-white active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  aria-label="Open Menu"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Highly Refined Integrated Navbar (Desktop Only) */}
              <nav className={`absolute transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] hidden md:flex items-center rounded-full border border-white/5 bg-transparent backdrop-blur-sm shadow-sm px-5 py-0.5 sm:px-8 sm:py-1 ${speaking ? 'left-2 sm:left-4 translate-x-0 scale-[0.7] opacity-60 hover:opacity-100 origin-top-left' : 'left-1/2 -translate-x-1/2 scale-100 opacity-100 origin-top'}`}>
                
                {/* Integrated Badge */}
                <div className={`overflow-hidden transition-all duration-[1000ms] ease-in-out flex items-center ${speaking ? 'max-w-0 opacity-0 px-0' : 'max-w-[200px] opacity-100 px-5 sm:px-6 border-r border-white/10 mr-1 sm:mr-2'}`}>
                  <span className="relative flex h-2 w-2 mr-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span 
                    key={HTTP_CODES[statusIndex]} 
                    className="w-24 sm:w-32 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/90 whitespace-nowrap animate-[pulseFade_1s_ease-in-out]"
                  >
                    {HTTP_CODES[statusIndex]}
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
              className="group relative flex items-center justify-center rounded-full w-8 h-8 sm:w-10 sm:h-10 text-white transition-all hover:scale-110"
            >
              {/* Outer Ripple Effects */}
              {!speaking && (
                <>
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-[-4px] rounded-full border border-emerald-500/20 animate-[pulse_2s_ease-in-out_infinite]" />
                </>
              )}

              {/* Button Body (Glass) */}
              <div className={`absolute inset-0 rounded-full border backdrop-blur-xl transition-all duration-500 ${speaking ? 'bg-white/10 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.3)] group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50'}`} />

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center">
                {speaking ? (
                  // Minimize Icon
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform hover:scale-110">
                    <polyline points="4 14 10 14 10 20"></polyline>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                    <polyline points="20 10 14 10 14 4"></polyline>
                    <line x1="14" y1="10" x2="21" y2="3"></line>
                  </svg>
                ) : (
                  // Expand Icon
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)] group-hover:text-white transition-colors duration-300">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="14" y1="10" x2="21" y2="3"></line>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="10" y1="14" x2="3" y2="21"></line>
                  </svg>
                )}
              </div>
            </button>
          </FadeIn>

          {/* Spacer to balance grid (Right) */}
          <div className="flex justify-end pointer-events-none" />
        </div>
      </div>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-2xl p-8 md:hidden"
          >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

            {/* Top bar inside menu */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                <span className="relative flex h-1.5 w-1.5 mr-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/90">
                  SYSTEM_MENU
                </span>
              </div>
              
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-white/20 active:scale-90 transition-all"
                aria-label="Close Menu"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu links in center */}
            <nav className="relative z-10 flex flex-col gap-8 my-auto items-center">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 120 }}
                  className="text-2xl font-black uppercase tracking-[0.2em] text-[#A0AEC0] hover:text-white transition-colors duration-300 py-1.5 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-1/2" />
                </motion.a>
              ))}
            </nav>

            {/* Footer in menu */}
            <div className="relative z-10 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
              taha@portfolio-os:~
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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







