import About from './About'
import '../styles/App.css'
import Awards from './Awards'
import Banner from './Banner'
import Built from './Built'
import Footer from './Footer'
import Reach from './Reach'
import TechScroll from './Techscroll'
import Venture from './Venture'
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

function App() {

  

useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
    
      <Banner/>
      <About/>
      <Built/>
      <TechScroll/>
      <Awards/>
      <Venture/>
      <Reach/>
      <Footer/>
    </>
  )
}

export default App
