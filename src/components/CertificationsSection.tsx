import { useState } from 'react';
import FadeIn from './FadeIn';

const CERTIFICATES = [
  { id: 1, image: "/certifications/Screenshot 2026-06-17 023529.webp", alt: "Certification 1" },
  { id: 2, image: "/certifications/UC-a217c19a-8c5a-498f-9e2a-dd9bacbe0921.webp", alt: "Certification 2" },
  { id: 3, image: "/certifications/UC-bbaacbfa-cf79-4894-a981-378e8b7ac0b7.webp", alt: "Certification 3" },
  { id: 4, image: "/certifications/UC-f23a9b0e-1062-4877-80ae-cb78c2b203a4.webp", alt: "Certification 4" },
  { id: 6, image: "/certifications/certificate (4).webp", alt: "Certification 6" },
  { id: 7, image: "/certifications/certificate-3sumq6zebewy-1761167280_page-0001.webp", alt: "Certification 7" }
];

const CertificationsSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certifications" className="relative w-full bg-black py-20 sm:py-32 px-4 sm:px-6 md:px-10 overflow-hidden">
      {/* Background Glows (Optimized with Radial Gradients) */}
      <div className="absolute top-[10%] right-[-10%] h-[1000px] w-[1000px] -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] h-[1000px] w-[1000px] translate-y-1/4 -translate-x-1/4 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn y={20}>
          <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Certifications
            </h2>
            <div className="mt-4 h-px w-20 bg-white/30 rounded-full" />
            <p className="mt-6 max-w-2xl text-sm md:text-base text-white/60">
              Verified credentials and professional achievements.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 max-w-5xl mx-auto">
          {CERTIFICATES.map((cert, idx) => (
            <FadeIn key={cert.id} delay={idx * 0.1} y={30}>
              <div 
                className="group relative h-32 sm:h-40 md:h-48 w-full cursor-pointer overflow-hidden rounded-[15px] border border-white/10 bg-white/5 backdrop-blur-xl p-3 md:p-4 transition-all duration-500 hover:scale-[1.6] hover:z-50 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center"
                onClick={() => setSelectedImage(cert.image)}
              >
                <img 
                  src={cert.image} 
                  alt={cert.alt} 
                  className="max-h-full max-w-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  loading="lazy"
                  draggable={false}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
                   <div className="scale-90 opacity-0 transform transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                     <span className="rounded-full bg-white/10 border border-white/30 px-3 py-1.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-white shadow-xl flex items-center gap-1.5">
                       <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                       </svg>
                       View
                     </span>
                   </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <button 
              className="absolute -top-14 right-0 rounded-full bg-white/10 border border-white/20 p-3 text-white hover:bg-white/20 hover:scale-110 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
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






