import React, { useRef, useEffect } from "react";
import "../styles/Banner.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bannerVideo from "../assets/banner.MP4";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (isMobile) {
      const totalFrames = 104;
      const images = [];
      let loadedCount = 0;
      let lastRenderedFrame = -1;

      // Use device pixel ratio for high-res rendering
      const dpr = window.devicePixelRatio || 1;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const baseWidth = 640;
      const baseHeight = 1146;

      canvas.width = baseWidth * dpr;
      canvas.height = baseHeight * dpr;
      canvas.style.width = `${baseWidth}px`;
      canvas.style.height = `${baseHeight}px`;
      ctx.scale(dpr, dpr);

      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
        images.push(img);
        img.onload = () => {
          loadedCount++;
          if (loadedCount === 1) {
            ctx.drawImage(img, 0, 0, baseWidth, baseHeight);
          }
        };
      }

      let scrollProgress = 0;

      const render = () => {
        const frameIndex = Math.floor(scrollProgress * (totalFrames - 1));
        if (frameIndex !== lastRenderedFrame && images[frameIndex]?.complete) {
          lastRenderedFrame = frameIndex;
          drawImageCover(ctx, images[frameIndex], baseWidth, baseHeight);

        }
        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);

      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom+=2000 top",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          scrollProgress = self.progress;
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
  }, []);

  return (
    <section ref={sectionRef} className="banner-video-section">
      {isMobile ? (
        <canvas ref={canvasRef} className="banner-video" />
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
