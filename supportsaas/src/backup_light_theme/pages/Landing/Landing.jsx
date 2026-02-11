import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;
