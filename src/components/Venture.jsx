import React, { useEffect, useRef } from "react";
import "../styles/Venture.css";
import tabletImg from "../assets/tabletimg.png";
import img6 from "../assets/6img.png";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Venture = () => {
  const sectionRef = useRef(null);

useEffect(() => {
  const section = sectionRef.current;
  const items = section.querySelectorAll(".stack-item");

  // Force stacking visually with z-index
  items.forEach((item, index) => {
    gsap.set(item, {
      yPercent: index === 0 ? 0 : 100,
      autoAlpha: 1,
      
    });
  });

  // GSAP timeline
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top", // pin when top of section hits top of viewport
      end: () => `+=${items.length * window.innerHeight * 1.2}`,
      scrub: window.innerWidth <= 768 ? 0.3 : 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
    defaults: { ease: "none" },
  });

  items.forEach((item, index) => {
    timeline.to(item, {
      scale: index === 0 ? 0.95 : 0.96,
      borderRadius: "20px",
    });
    if (index < items.length - 1) {
      timeline.to(items[index + 1], { yPercent: 7 }, "<");
    }
  });

requestAnimationFrame(() => {
  ScrollTrigger.refresh();
});


  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
}, []);




  return (
    <section className="venture-stack-section" ref={sectionRef}>
      

      <div className="stack-wrapper">
        <section className="venture-section stack-item bg-dark">
          <div className="venture-content">
            <div className="venture-heading">
              <h1>MY VENTURE:</h1>
              <h1 className="mitbots">MITBOTS</h1>
            </div>
            <div className="venture-main">
              <img src={tabletImg} alt="tablet" className="tablet-img" />
              <p className="venture-description">
                Mitbots is my sandbox, studio, and shipyard — all in one. We
                build ideas that solve real problems and scale without noise. As
                the Founder & CEO, I lead a team driven by purpose and
                precision, building impactful products.
              </p>
            </div>
          </div>
        </section>
        <section className="life-section stack-item bg-light">
          <div className="life-content">
            <div className="life-text">
              <h1>LIFE OUTSIDE THE DESK</h1>
              <p>
                Outside of building and leading, I enjoy mentoring young
                developers, sketching product ideas on café napkins, or lost in
                the world of design and aesthetics. <br />
                I find joy in art — whether it’s drawing, painting, or capturing
                moments through photography. For me, creativity doesn’t stop at
                the screen; it just changes medium.
              </p>
            </div>
            <img src={img6} alt="Life" className="life-img" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Venture;
