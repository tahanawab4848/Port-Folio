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
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    // Adding deliberate punctuation forces the AI voice to take natural breaths and pauses
    const text = "Hi... I'm Muhammad Taha Nawab. A Computer Science student, and Full-Stack Developer, with expertise in A.I. and Machine Learning. Welcome, to my portfolio.";
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Smooth, refined pacing
    utterance.pitch = 0.95;
    utterance.rate = 0.92;

    const voices = window.speechSynthesis.getVoices();
    
    // Helper to identify likely male voices across different OS's
    const isMale = (v: SpeechSynthesisVoice) => {
      const name = v.name.toLowerCase();
      // Look for explicit 'male' tag or common built-in male voice names for iOS/Android/Windows/Mac
      return name.includes('male') || 
             name.includes('david') || // Windows US
             name.includes('mark') ||  // Windows US
             name.includes('daniel') || // iOS UK
             name.includes('arthur') || // iOS UK
             name.includes('aaron') ||  // iOS US
             name.includes('rishi') ||  // iOS Indian English
             name.includes('prabhat') || // Android Indian English
             name.includes('alex') ||    // Mac US
             name.includes('fred') ||    // Mac US
             name.includes('brian') ||   // Mac/iOS UK
             name.includes('james') ||   // Windows
             name.includes('cory') ||    // iOS
             name.includes('guy');       // Windows
    };

    let isDefinitelyMale = true;

    // Priority 1: Pakistani or Indian Male voice
    let targetVoice = voices.find(v => (v.lang.includes('PK') || v.lang.includes('IN')) && isMale(v));

    // Priority 2: UK or US Male voice
    if (!targetVoice) {
      targetVoice = voices.find(v => (v.lang.includes('GB') || v.lang.includes('UK') || v.lang.includes('US')) && isMale(v));
    }

    // Priority 3: ANY Male voice at all
    if (!targetVoice) {
      targetVoice = voices.find(v => isMale(v));
    }
    
    // Priority 4: If literally no male voice can be found, fallback to standard English
    if (!targetVoice) {
      targetVoice = voices.find(v => v.lang.includes('GB') || v.lang.includes('UK') || v.lang.includes('US'));
      isDefinitelyMale = false; // We failed to find a male voice
    }

    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    // If the phone forces us to use a default female voice, drop the pitch aggressively 
    // to synthetically make it sound masculine and robotic/premium.
    if (!isDefinitelyMale) {
      utterance.pitch = 0.5; // Deepen the voice
    }
    
    utterance.onstart = () => {
      setSpeaking(true);
      if (videoRef.current) {
        // Restart video so the avatar's animation starts exactly when the voice does
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    };

    utterance.onend = () => {
      setSpeaking(false);
      if (videoRef.current) {
        // Pause the video so the avatar stops moving its mouth when the voice ends
        videoRef.current.pause();
      }
    };
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Force Chrome to load voices
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-black">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Animated glowing orbs & tech grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen" style={{ animation: 'floatOrb 15s ease-in-out infinite' }} />
        <div className="absolute bottom-[10%] right-[10%] h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-[150px] mix-blend-screen" style={{ animation: 'floatOrb 18s ease-in-out infinite reverse' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 mix-blend-overlay" />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top bar */}
        <FadeIn delay={0} y={-20} className="relative">
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-8">
            <ul className="flex items-center gap-3 sm:gap-8 md:gap-12">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-[1.03]"
            >
              Email me
            </a>
          </div>
        </FadeIn>

        {/* Middle-left: PORTFOLIO + Name + Subtitle */}
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-7xl px-6 md:px-10">
            <FadeIn delay={0.3} y={20}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                </span>
                <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-white/80">
                  Portfolio · 2026
                </p>
              </div>
            </FadeIn>



            <FadeIn delay={0.65} y={30}>
              <h1
                className="hero-heading mt-4 sm:mt-6 md:mt-8 font-black uppercase tracking-tighter leading-[0.85] text-white break-words"
                style={{ fontSize: 'clamp(2.25rem, 8vw, 150px)' }}
              >
                <ScrambleText text="Muhammad Taha Nawab" delay={0.8} />
              </h1>
            </FadeIn>

            <FadeIn delay={0.85} y={20}>
              <p className="mt-5 md:mt-7 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.3em] bg-gradient-to-r from-blue-400 via-purple-400 to-white bg-clip-text text-transparent">
                Full-Stack Developer · AI/ML Engineer
              </p>
            </FadeIn>

            <FadeIn delay={1.0} y={20}>
              <div className="mt-8 md:mt-10">
                <a
                  href="/Muhammad_Taha_Nawab_CV.pdf"
                  download="Muhammad_Taha_Nawab_CV.pdf"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/30 bg-white/10 px-6 py-3 sm:px-8 sm:py-3.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"></span>
                  <svg className="relative z-10" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-10 md:pb-12">
          {/* Scroll indicator */}
          <FadeIn delay={1.1} y={20}>
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

          {/* TTS toggle */}
          <FadeIn delay={1.1} y={20}>
            <button
              onClick={toggleSpeech}
              aria-label={speaking ? 'Stop speaking' : 'Speak intro'}
              className="flex items-center gap-2 sm:gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:px-5 sm:py-3 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-[1.05]"
            >
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                {speaking ? 'Stop' : 'Hear Me'}
              </span>
              {speaking ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </FadeIn>

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
