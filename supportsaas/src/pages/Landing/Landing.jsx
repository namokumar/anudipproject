import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import ProblemSolution from './components/ProblemSolution';
import USP from './components/USP';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Integrations from './components/Integrations';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Security from './components/Security';
import CTA from './components/CTA';
import Footer from './components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <Hero />
      <TrustedBy />
      <ProblemSolution />
      <USP />
      <Features />
      <HowItWorks />
      <Integrations />
      <Testimonials />
      <Pricing />
      <Security />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
