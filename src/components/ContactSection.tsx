import { Mail, MessageCircle, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  hoverColor: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'official.taha.nawab@gmail.com',
    href: 'mailto:official.taha.nawab@gmail.com',
    hoverColor: '#EA4335',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+92 306 2540001',
    // wa.me requires digits only — no +, no spaces, no hyphens
    href: 'https://wa.me/923062540001',
    hoverColor: '#25D366',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/tahanawab4848',
    href: 'https://www.linkedin.com/in/tahanawab4848/',
    hoverColor: '#0A66C2',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@tahanawab4848',
    href: 'https://github.com/tahanawab4848',
    hoverColor: '#333333',
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Get in touch
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          Pick whichever channel suits you
        </p>
      </FadeIn>

      {/* Contact cards - 3D Isometric */}
      <div className="mx-auto flex flex-wrap justify-center gap-12 sm:gap-16 md:gap-20 pt-16 pb-24">
        {CONTACT_METHODS.map((method, i) => {
          const Icon = method.icon;
          const isExternal = method.href.startsWith('http');

          return (
            <FadeIn key={method.label} delay={i * 0.1} y={30}>
              <div 
                style={{ 
                  animation: 'floatIso 4s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`
                }}
              >
                <a
                  href={method.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="iso-btn group flex items-center justify-center gap-3 text-[#D7E2EA]/80 hover:text-white"
                  style={{ '--hover-color': method.hoverColor } as React.CSSProperties}
                >
                  {/* Sweeping Light Glare Wrapper */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-sm">
                    <div className="absolute top-0 bottom-0 w-[40px] bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[45deg] -left-[100px] group-hover:animate-[sweepBtn_0.6s_ease-in-out_forwards]" />
                  </div>

                  {/* DP Image that pops in on hover */}
                  <div className="relative z-10 flex h-0 w-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/50 opacity-0 transition-all duration-300 ease-out group-hover:h-8 group-hover:w-8 group-hover:opacity-100 group-hover:scale-110">
                    <img src="/profile.png" alt="Taha" className="h-full w-full object-cover" />
                  </div>

                  <Icon size={24} strokeWidth={2} className="transition-transform duration-300 group-hover:scale-110 relative z-10" />
                  <span className="font-bold uppercase tracking-widest text-sm sm:text-base relative z-10">
                    {method.label}
                  </span>
                </a>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <style>{`
        @keyframes floatIso {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes sweepBtn {
          0% { left: -100px; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 250px; opacity: 0; }
        }

        .iso-btn {
          position: relative;
          z-index: 1;
          min-width: 220px;
          padding: 0 1rem;
          height: 65px;
          background: rgba(20, 20, 24, 0.4);
          border: 1px solid rgba(215, 226, 234, 0.3);
          transform: rotate(-30deg) skew(25deg);
          /* Bouncy spring transition */
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.4s ease, z-index 0s;
          box-shadow: -15px 15px 15px rgba(0,0,0,0.6);
          text-decoration: none;
        }

        .iso-btn::before {
          content: '';
          position: absolute;
          top: 100%;
          left: -1px;
          width: 100%;
          height: 20px;
          background: rgba(215, 226, 234, 0.1);
          border: 1px solid rgba(215, 226, 234, 0.3);
          border-top: none;
          transform: skewX(-45deg);
          transform-origin: top;
          transition: background 0.4s ease, filter 0.4s ease, opacity 0.4s ease;
        }

        .iso-btn::after {
          content: '';
          position: absolute;
          top: -1px;
          left: 100%;
          width: 20px;
          height: 100%;
          background: rgba(215, 226, 234, 0.05);
          border: 1px solid rgba(215, 226, 234, 0.3);
          border-left: none;
          transform: skewY(-45deg);
          transform-origin: left;
          transition: background 0.4s ease, filter 0.4s ease, opacity 0.4s ease;
        }

        .iso-btn:hover {
          transform: rotate(0deg) skew(0deg) scale(1.25) translateY(-15px);
          box-shadow: 0px 30px 40px rgba(0,0,0,0.8);
          background: var(--hover-color);
          z-index: 20;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.4s ease, z-index 0s;
        }

        .iso-btn:hover::before {
          opacity: 0;
        }

        .iso-btn:hover::after {
          opacity: 0;
        }
      `}</style>

      {/* Footer line */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-20 sm:mt-24 md:mt-28 flex max-w-5xl flex-col items-center gap-3 border-t border-[#D7E2EA]/10 pt-8 text-center sm:flex-row sm:justify-between">
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            © 2026 Muhammad Taha Nawab
          </span>
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            Designed & built in Islamabad
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;




