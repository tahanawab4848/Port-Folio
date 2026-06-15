import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';

const App = () => {
  return (
    <main
      className="relative w-full"
      style={{ overflowX: 'clip', background: '#0C0C0C' }}
    >
      <CustomCursor />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
};

export default App;
