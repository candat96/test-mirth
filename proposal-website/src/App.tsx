import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Overview from './sections/Overview';
import Architecture from './sections/Architecture';
import Benefits from './sections/Benefits';
import Comparison from './sections/Comparison';
import Roadmap from './sections/Roadmap';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Overview />
        <Architecture />
        <Benefits />
        <Comparison />
        <Roadmap />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
