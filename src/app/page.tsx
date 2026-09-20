import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import AccessibilityWidget from "@/components/ui/AccessibilityWidget";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import TechMarquee from "@/components/sections/TechMarquee";
import InteractiveCV from "@/components/sections/InteractiveCV";
import PageRunner from "@/components/ui/PageRunner";
import Services from "@/components/sections/Services";
import Loader from "@/components/ui/Loader";
import MotionProvider from "@/components/ui/MotionProvider";

export default function Home() {
  return (
    <MotionProvider>
    <div className="relative min-h-screen overflow-x-clip bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Loader />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <TechMarquee />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <InteractiveCV />
        <Contact />
      </main>
      <Footer />
      <AccessibilityWidget />
      <BackToTop />
      <PageRunner />
    </div>
    </MotionProvider>
  );
}
