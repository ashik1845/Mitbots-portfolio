import React, { useEffect, useRef, useState } from "react";
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

  const [loading, setLoading] = useState(isMobile); // ✅ true only for mobile

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (isMobile) {
  const totalFrames = 104;
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.clientHeight; // OR:
canvas.height = window.innerHeight; // fallback


  // GPU acceleration hint
  canvas.style.willChange = "transform, opacity";

  const images = [];
  let loadedImages = 0;
  let currentFrame = 0;
  let targetFrame = 0;
  let lastRenderedFrame = -1;

  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
    images.push(img);
    img.onload = () => {
      loadedImages++;
      if (loadedImages === 1) {
        render(0);
        setLoading(false);
      }
    };
  }

  const render = (index) => {
  const img = images[index];
  if (!img || !img.complete) return;

  if (index === lastRenderedFrame) return;
  lastRenderedFrame = index;

  context.clearRect(0, 0, canvas.width, canvas.height);

  const canvasAspect = canvas.width / canvas.height;
  const imageAspect = img.width / img.height;

  let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

if (imageAspect > canvasAspect) {
      // Image is wider → crop sides
      drawHeight = canvas.height;
      drawWidth = drawHeight * imageAspect;
      offsetX = -(drawWidth - canvas.width) / 2;
  } else {
    // Image is taller → also fit width, crop height
    drawWidth = canvas.width;
    drawHeight = drawWidth / imageAspect;
    offsetY = -(drawHeight - canvas.height) / 2;
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
};


  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom+=2000 top",
    scrub: true,
    pin: true,
    onUpdate: (self) => {
      targetFrame = self.progress * (totalFrames - 1);
    },
  });

  const animate = () => {
    currentFrame += (targetFrame - currentFrame) * 0.12; // ✅ Smaller = smoother
    const rounded = Math.round(currentFrame);
    render(rounded);
    requestAnimationFrame(animate);
  };

  animate();
}


     else {
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
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      )}
      {isMobile ? (
        <canvas ref={canvasRef} className="banner-canvas" />
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
