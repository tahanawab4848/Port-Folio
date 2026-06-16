import { useState } from 'react';
import FadeIn from './FadeIn';

const CERTIFICATES = [
  { id: 1, image: "/certifications/Screenshot 2026-06-17 023529.png", alt: "Certification 1" },
  { id: 2, image: "/certifications/UC-a217c19a-8c5a-498f-9e2a-dd9bacbe0921.jpg", alt: "Certification 2" },
  { id: 3, image: "/certifications/UC-bbaacbfa-cf79-4894-a981-378e8b7ac0b7.jpg", alt: "Certification 3" },
  { id: 4, image: "/certifications/UC-f23a9b0e-1062-4877-80ae-cb78c2b203a4.jpg", alt: "Certification 4" },
  { id: 6, image: "/certifications/certificate (4).png", alt: "Certification 6" },
  { id: 7, image: "/certifications/certificate-3sumq6zebewy-1761167280_page-0001.jpg", alt: "Certification 7" }
];

const CertificationsSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certifications" className="relative w-full bg-[#050505] py-20 sm:py-32 px-4 sm:px-6 md:px-10 overflow-hidden">
      {/* Background Glows (Optimized with Radial Gradients) */}
      <div className="absolute top-[10%] right-[-10%] h-[1000px] w-[1000px] -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] h-[1000px] w-[1000px] translate-y-1/4 -translate-x-1/4 bg-[radial-gradient(circle,rgba(147,51,234,0.10)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn y={20}>
          <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Certifications
            </h2>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            <p className="mt-6 max-w-2xl text-sm md:text-base text-white/60">
              Verified credentials and professional achievements.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((cert, idx) => (
            <FadeIn key={cert.id} delay={idx * 0.1} y={30}>
              <div 
                className="group relative h-64 md:h-80 w-full cursor-pointer overflow-hidden rounded-[20px] md:rounded-[30px] border border-white/10 bg-black/50 p-4 md:p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-black/70 hover:border-white/20 hover:shadow-[0_0_40px_rgba(120,119,198,0.2)] flex items-center justify-center"
                onClick={() => setSelectedImage(cert.image)}
              >
                <img 
                  src={cert.image} 
                  alt={cert.alt} 
                  className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  loading="lazy"
                  draggable={false}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
                   <div className="translate-y-4 transform transition-all duration-500 group-hover:translate-y-0">
                     <span className="rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl flex items-center gap-2">
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                       </svg>
                       View Certificate
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-lg transition-opacity duration-300"
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
