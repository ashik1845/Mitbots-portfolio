// Banner.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Banner.css";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 35;
const isMobile = window.innerWidth <= 768;

const Banner = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // 🔁 Use Vite's import.meta.glob to load all JPGs
  const frameModules = import.meta.glob('../assets/frames/*.jpg', { eager: true });
  const framePaths = Object.entries(frameModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);

  useEffect(() => {
    if (!isMobile || framePaths.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images = framePaths.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const render = (img) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    gsap.to({ frame: 0 }, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom+=1000 top",
        scrub: true,
        pin: true,
      },
      onUpdate: function () {
        const index = Math.floor(this.targets()[0].frame);
        const img = images[index];
        if (img?.complete) render(img);
      }
    });
  }, [framePaths]);

  // 🖥 Desktop video scroll animation
  useEffect(() => {
    if (isMobile) return;

    const video = videoRef.current;
    const section = sectionRef.current;
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
    <section ref={sectionRef} className="banner-video-section">
      {isMobile ? (
        <canvas ref={canvasRef} className="image-sequence-canvas" />
      ) : (
        <video
          ref={videoRef}
          className="banner-video"
          src="/src/assets/banner.MP4"
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
