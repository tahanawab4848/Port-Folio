import FadeIn from './FadeIn';

const CERTIFICATIONS = [
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University & DeepLearning.AI",
    date: "2024",
    skills: ["Python", "TensorFlow", "Neural Networks"],
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    )
  },
  {
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2023",
    skills: ["Cloud Architecture", "Serverless", "AWS Lambda"],
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    )
  },
  {
    title: "Full-Stack Web Development",
    issuer: "Meta",
    date: "2023",
    skills: ["React", "Node.js", "System Design"],
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  }
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="relative w-full bg-[#050505] py-24 sm:py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <FadeIn y={20}>
          <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Certifications
            </h2>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            <p className="mt-6 max-w-2xl text-sm md:text-base text-white/60">
              Professional credentials demonstrating expertise in modern web technologies, cloud infrastructure, and artificial intelligence.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, idx) => (
            <FadeIn key={idx} delay={idx * 0.15} y={30}>
              <div className="group relative h-full rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(120,119,198,0.15)]">
                {/* Glowing border effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-white/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-white/5 group-hover:opacity-100 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {cert.icon}
                  </div>
                  
                  <div className="mb-auto">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                      {cert.date}
                    </p>
                    <h3 className="mb-2 text-lg font-bold text-white md:text-xl leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {cert.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
