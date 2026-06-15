import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import AnimatedText from './AnimatedText';

const ABOUT_TEXT =
  "I'm a Computer Science student at COMSATS University Islamabad with hands-on experience architecting and shipping full-stack web applications using the MERN stack and production-grade AI/ML systems. I focus on building scalable REST APIs, React SPAs, and machine learning pipelines. Let's build something incredible together!";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Corner decorative 3D images */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
          className="pointer-events-none absolute top-10 sm:top-20 left-[1%] sm:left-[2%] md:left-[4%] w-[60px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
          className="pointer-events-none absolute top-[30%] sm:top-[40%] left-[3%] sm:left-[6%] md:left-[10%] w-[55px] sm:w-[140px] md:w-[180px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
          className="pointer-events-none absolute top-10 sm:top-20 right-[1%] sm:right-[2%] md:right-[4%] w-[60px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
          className="pointer-events-none absolute top-[30%] sm:top-[40%] right-[3%] sm:right-[6%] md:right-[10%] w-[65px] sm:w-[170px] md:w-[220px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
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
              <div className="relative flex flex-col items-center rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:p-10 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden group">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />
                
                {/* DP Avatar */}
                <div className="relative mb-6 h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-2 border-white/20 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent mix-blend-overlay pointer-events-none z-10" />
                  <img src="/profile.png" alt="Muhammad Taha Nawab" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
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
          <FadeIn delay={0.15} className="w-full mt-10 lg:mt-16 border-t border-white/5 pt-10 lg:pt-16">
            <h3 className="mb-8 lg:mb-12 text-center text-xs sm:text-sm font-bold uppercase tracking-[0.4em] text-white/50">
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
                  className="flex flex-col items-center xl:items-start gap-6 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/40 text-center xl:text-left">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap justify-center xl:justify-start gap-3">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] px-4 py-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/80 hover:border-[#D7E2EA]/40 hover:text-white transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
    </section>
  );
};

export default AboutSection;
