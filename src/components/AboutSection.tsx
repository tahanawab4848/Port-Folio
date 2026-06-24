import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import AnimatedText from './AnimatedText';
import { Cpu, Terminal, Moon, Hexagon } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';


const ABOUT_TEXT =
  "I'm a Computer Science student at COMSATS University Islamabad with hands-on experience architecting and shipping full-stack web applications using the MERN stack and production-grade AI/ML systems. I focus on building scalable REST APIs, React SPAs, and machine learning pipelines. Let's build something incredible together!";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 sm:px-8 md:px-10 py-16 sm:py-20"
    >
      {/* Corner decorative 3D images (Top Row Only) */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute top-10 sm:top-20 left-[1%] sm:left-[2%] md:left-[4%] opacity-20 animate-[float_7s_ease-in-out_infinite] hidden sm:block"
      >
        <Moon size={120} className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute top-10 sm:top-20 right-[1%] sm:right-[2%] md:right-[4%] opacity-20 animate-[float_8s_ease-in-out_infinite_reverse] hidden sm:block"
      >
        <Hexagon size={120} className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
      </FadeIn>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center w-full">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24 xl:gap-32 w-full max-w-7xl mx-auto px-4 sm:px-0">
            {/* Left Column: Glassmorphism ID Card */}
            <FadeIn delay={0.1} y={20} className="w-full max-w-sm shrink-0 mt-2 lg:mt-6">
              <div className="relative flex flex-col items-center rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden group">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />
                
                {/* DP Avatar */}
                <div className="relative mb-6 h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-2 border-white/20 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none z-10" />
                  <img src="/profile.webp" alt="Muhammad Taha Nawab" className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" draggable={false} />
                </div>
                
                {/* ID Info */}
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-white text-center">
                  Taha Nawab
                </h3>
                <p className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#D7E2EA]/60 text-center">
                  Full-Stack Dev
                </p>
                
                {/* ID Metadata */}
                <div className="mt-8 w-full border-t border-white/10 pt-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-[10px] sm:text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">
                    <span>Base</span>
                    <span className="text-white font-bold">Islamabad</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] sm:text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">
                    <span>Status</span>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                      </span>
                      <span className="text-white font-bold">Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Bio */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-10 lg:gap-14 w-full justify-center">
              <AnimatedText
                text={ABOUT_TEXT}
                className="font-medium leading-relaxed text-[#D7E2EA] max-w-[650px]"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}
              />
              <FadeIn delay={0.25} className="mt-4 lg:mt-8">
                <ContactButton />
              </FadeIn>
            </div>
          </div>

          {/* Bottom Row: Tech Stack */}
          <FadeIn delay={0.15} className="relative w-full mt-4 lg:mt-6 border-t border-white/5 pt-8 lg:pt-10">
            {/* Tech Animations */}
            <div className="pointer-events-none absolute -top-8 sm:-top-10 left-[5%] sm:left-[10%] opacity-40 hidden sm:block">
              <div className="relative flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/10 bg-[#0C0C0C] shadow-[0_0_30px_rgba(255,255,255,0.05)] animate-[spin_12s_linear_infinite]">
                <Cpu size={28} className="text-white/60 animate-[pulse_3s_ease-in-out_infinite]" />
                <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-white/20 animate-[spin_20s_linear_infinite_reverse]" />
              </div>
            </div>

            <div className="pointer-events-none absolute -top-8 sm:-top-10 right-[5%] sm:right-[10%] opacity-40 hidden sm:block">
              <div className="relative flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/10 bg-[#0C0C0C] shadow-[0_0_30px_rgba(255,255,255,0.05)] animate-[float_4s_ease-in-out_infinite]">
                <Terminal size={28} className="text-white/60" />
                <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-dotted border-white/30 animate-[spin_15s_linear_infinite]" />
              </div>
            </div>

            <h3 className="mb-6 lg:mb-10 text-center text-lg sm:text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-white/70 relative z-10">
              Technical Arsenal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 w-full max-w-7xl mx-auto px-4 sm:px-0">
              {[
                {
                  label: 'Languages',
                  items: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL', 'Java', 'C++'],
                },
                {
                  label: 'Frameworks',
                  items: ['React', 'Node.js', 'Express', 'FastAPI', 'scikit-learn', 'HuggingFace'],
                },
                {
                  label: 'Tools & Platforms',
                  items: ['Git', 'Docker', 'PostgreSQL', 'MongoDB', 'Postman'],
                },
                {
                  label: 'AI & GenAI',
                  items: ['OpenAI', 'Gemini', 'MediaPipe', 'OpenCV'],
                },
              ].map((group) => (
                <div
                  key={group.label}
                  className="group/card flex flex-col items-center xl:items-start gap-6 p-8 rounded-[2rem] bg-black border border-white hover:bg-white hover:border-black hover:-translate-y-3 hover:shadow-[0_30px_50px_rgba(255,255,255,0.2)] transition-all duration-500"
                >
                  <span className="text-sm font-semibold tracking-wider text-white/80 text-center xl:text-left group-hover/card:text-black/80 transition-colors duration-500">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap justify-center xl:justify-start gap-3">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white bg-black px-4 py-2 text-xs sm:text-sm font-medium text-white hover:scale-110 hover:-translate-y-1 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover/card:border-black group-hover/card:bg-white group-hover/card:text-black group-hover/card:hover:bg-black group-hover/card:hover:text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Live Activity Section */}
          <FadeIn delay={0.6} y={30} className="mt-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-widest text-white uppercase">
                Live GitHub Activity
              </h3>
            </div>
            
            <div className="w-full flex justify-start sm:justify-center rounded-2xl border border-white/10 bg-[#0A0A0A]/40 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-x-auto transition-all hover:bg-[#0A0A0A]/60 hover:border-white/20">
              <div className="min-w-max">
                <GitHubCalendar 
                  username="tahanawab4848" 
                  colorScheme="dark"
                  theme={{
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                  blockSize={13}
                  blockMargin={5}
                  fontSize={13}
                />
              </div>
            </div>
          </FadeIn>
        </div>
    </section>
  );
};

export default AboutSection;




