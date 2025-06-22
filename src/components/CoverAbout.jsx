import React, { useRef, useEffect } from "react";
import "../styles/CoverAbout.css";
import bannerVideo from "../assets/banner.mp4";
import bannerVideoMobile from "../assets/banner.mp4";
import profileImage from "../assets/profileimg.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CoverAbout = () => {
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  const isMobile = window.innerWidth <= 480;
  const selectedVideo = isMobile ? bannerVideoMobile : bannerVideo;

  useEffect(() => {
    const video = videoRef.current;
    const section = videoSectionRef.current;

    if (!video || !section) return;

    video.pause();
    video.currentTime = 0;

    let targetTime = 0;
    let currentTime = 0;

    const update = () => {
      if (video.readyState >= 2) {
        const diff = targetTime - currentTime;
        currentTime += diff * 0.08;
        video.currentTime = currentTime;
      }
    };

    gsap.ticker.add(update);

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom+=2000 top",
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        if (video.duration) {
          targetTime = video.duration * self.progress;
        }
      },
    });

    return () => {
      gsap.ticker.remove(update);
      scrollTrigger.kill();
    };
  }, []);

  return (
    <>
      <section ref={videoSectionRef} className="cover-about-video-section">
        <video
          ref={videoRef}
          className="cover-about-video"
          src={selectedVideo}
          type="video/mp4"
          muted
          playsInline
          preload="auto"
        />
      </section>

      <section className="cover-about-content-section">
        <div className="cover-about-content">
          <div className="cover-about-text">
            <h1 className="cover-about-header">WHAT I BELIEVE IN</h1>
            <p className="cover-about-paragraph">
              I believe tech should serve with empathy, scale with clarity, and last with purpose.
              I don’t just build software. I craft systems that respect the user, elevate the brand, and
              evolve with time. The best lines of code are the ones that solve real human problems.
            </p>
            <p className="cover-about-quote">
              Ideas are born every minute. Only a few are translated into code, shaped into product, and 
              driven to impact.
            </p>
          </div>
          <div className="cover-about-image">
            <img src={profileImage} alt="Profile" />
          </div>
        </div>
      </section>
    </>
  );
};

export default CoverAbout;
