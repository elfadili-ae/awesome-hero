import { gsap } from 'gsap';
import './App.css';
import Hero from './components/Hero';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const quoteRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.to(quoteRef.current, {
      y: -200, // Adjust this value for the amount of parallax movement
      opacity: 1,
      ease: "bounce",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="App">
      <Hero heroRef={heroRef} />
      <div ref={quoteRef} className='quote'>
        <p className=''>If the path be<br /><span>beautiful</span><br />let us not ask<br />where it leads</p>
      </div>
    </div>
  );
}

export default App;
