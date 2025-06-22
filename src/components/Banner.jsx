// Banner.jsx
import React, { useRef, useEffect } from "react";
import "../styles/Banner.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bannerVideo from "../assets/banner.MP4";
import bannerVideoMobile from "../assets/bannermob.mp4";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  const isMobile = window.innerWidth <= 768;
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
    <section ref={videoSectionRef} className="banner-video-section">
      <video
        ref={videoRef}
        className="banner-video"
        src={selectedVideo}
        type="video/mp4"
        muted
        playsInline
        preload="auto"
      />
    </section>
  );
};

export default Banner;
