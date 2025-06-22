import React, { useRef, useEffect } from "react";
import "../styles/About.css";
import profileImage1 from "../assets/profileimg.png";
import profileImage2 from "../assets/profileimg2.png";
import profileImageSketch from "../assets/sketch.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef();
  const img1Ref = useRef();
  const img2Ref = useRef();
  const quoteRef = useRef();

useEffect(() => {
  const ctx = gsap.context(() => {
    const isMobile = window.innerWidth < 480;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: isMobile ? "bottom bottom" : "center center", // 👈 responsive logic
        end: "+=200%",
        scrub: true,
        pin: true,
      },
    });

    tl.to(img2Ref.current, {
      clipPath: "inset(0% 0 0 0)",
      ease: "none",
    }, 0);

    tl.fromTo(quoteRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, ease: "power2.out" },
      0.1
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <section className="cover-about-content-section bg-light" ref={sectionRef}>
      <div className="cover-about-content">
        <div className="cover-about-text">
          <h1 className="cover-about-header">WHAT I BELIEVE IN</h1>
          <p className="cover-about-paragraph">
            I believe tech should serve with empathy, scale with clarity, and last with purpose.
            I don’t just build software. I craft systems that respect the user, elevate the brand, and
            evolve with time. The best lines of code are the ones that solve real human problems.
          </p>
          <p className="cover-about-quote" ref={quoteRef}>
            Ideas are born every minute. Only a few are translated into code, shaped into product, and 
            driven to impact.
          </p>
        </div>

        <div className="cover-about-image">
  <img
    src={profileImageSketch}
    alt="ProfileSketch"
    className="profile-img img-sketch"
  />
  <img
    src={profileImage1}
    alt="Profile1"
    className="profile-img img-1"
    ref={img1Ref}
  />
  <img
    src={profileImage2}
    alt="Profile2"
    className="profile-img img-2"
    ref={img2Ref}
  />
</div>

      </div>
    </section>
  );
};

export default About;

