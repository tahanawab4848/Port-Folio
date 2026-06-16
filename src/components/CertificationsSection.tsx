import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

const CERTIFICATES = [
  { id: 1, image: "/certifications/Screenshot 2026-06-17 023529.png", alt: "Certification 1", title: "Certificate of Excellence" },
  { id: 2, image: "/certifications/UC-a217c19a-8c5a-498f-9e2a-dd9bacbe0921.jpg", alt: "Certification 2", title: "Professional Credential" },
  { id: 3, image: "/certifications/UC-bbaacbfa-cf79-4894-a981-378e8b7ac0b7.jpg", alt: "Certification 3", title: "Advanced Specialization" },
  { id: 4, image: "/certifications/UC-f23a9b0e-1062-4877-80ae-cb78c2b203a4.jpg", alt: "Certification 4", title: "Technical Achievement" },
  { id: 5, image: "/certifications/WhatsApp Image 2025-10-25 at 15.16.51_c39a18df.jpg", alt: "Certification 5", title: "Industry Recognition" },
  { id: 6, image: "/certifications/certificate (4).png", alt: "Certification 6", title: "Skill Certification" },
  { id: 7, image: "/certifications/certificate-3sumq6zebewy-1761167280_page-0001.jpg", alt: "Certification 7", title: "Mastery Award" }
];

interface CertCardProps {
  cert: any;
  index: number;
  total: number;
  onImageClick: (img: string) => void;
}

const CertCard = ({ cert, index, total, onImageClick }: CertCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:top-32 h-[75vh] w-full max-w-5xl mx-auto"
      style={{ top: `${96 + index * 30}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col md:flex-row gap-6 md:gap-8 rounded-[40px] md:rounded-[60px] border border-white/10 bg-black/80 backdrop-blur-xl p-6 md:p-8 cursor-pointer group shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/30"
        onClick={() => onImageClick(cert.image)}
      >
        <div className="flex-1 overflow-hidden rounded-[30px] md:rounded-[40px] relative">
          <img
            src={cert.image}
            alt={cert.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-end justify-center pb-10">
             <span className="rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-xl transition-transform duration-500 hover:scale-110">
               Click to View Full Size
             </span>
          </div>
        </div>
        
        {/* Subtle Side Info Panel */}
        <div className="hidden md:flex flex-col justify-center w-1/4 min-w-[250px] border-l border-white/10 pl-8">
           <span className="text-5xl font-black text-white/10 mb-4">{String(index + 1).padStart(2, '0')}</span>
           <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
           <p className="text-white/50 text-sm uppercase tracking-widest">Verified Credential</p>
           
           <div className="mt-8 flex gap-2">
             <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
             <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
           </div>
        </div>
      </motion.article>
    </div>
  );
};

const CertificationsSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certifications" className="relative w-full bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 md:px-10">
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-20 sm:mb-28 text-white"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}
        >
          Certifications
        </h2>
      </FadeIn>

      <div className="relative z-10 mx-auto max-w-7xl pb-32">
        {CERTIFICATES.map((cert, idx) => (
          <CertCard 
            key={cert.id} 
            cert={cert} 
            index={idx} 
            total={CERTIFICATES.length} 
            onImageClick={setSelectedImage}
          />
        ))}
      </div>

      {/* Background Glows */}
      <div className="absolute top-[20%] right-0 h-[800px] w-[800px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 h-[800px] w-[800px] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none" />

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <button 
              className="absolute -top-12 right-0 rounded-full bg-white/10 border border-white/20 p-3 text-white hover:bg-white/20 hover:scale-110 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage} 
              alt="Expanded Certification" 
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-[0_0_100px_rgba(255,255,255,0.1)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;
