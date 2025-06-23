import React, { useRef, useEffect } from "react";
import "../styles/Banner.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bannerVideo from "../assets/banner.MP4";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const sectionRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (isMobile) {
      const totalFrames = 104;

      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom+=2000 top",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          // ✅ Define `frame` properly here
          const frame = Math.floor(self.progress * (totalFrames - 1)) + 1;
          const frameSrc = `/frames/frame_${String(frame).padStart(4, "0")}.jpg`;

          if (imgRef.current && imgRef.current.src !== frameSrc) {
            imgRef.current.src = frameSrc;
          }
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    } else {
      const video = videoRef.current;
      if (!video) return;

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
    }
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="banner-video-section">
      {isMobile ? (
        <img
          ref={imgRef}
          className="banner-video"
          src="/frames/frame_0001.jpg"
          alt="Banner frame sequence"
        />
      ) : (
        <video
          ref={videoRef}
          className="banner-video"
          src={bannerVideo}
          type="video/mp4"
          muted
          playsInline
          preload="auto"
        />
      )}
    </section>
  );
};

export default Banner;
