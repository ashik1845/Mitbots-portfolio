import React, { useState, useRef, useEffect } from "react";
import "../styles/Awards.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


import logo from "../assets/achievement-logo.png";

// Award images (ensure correct paths)
import img1 from "../assets/award1.png";
import img2 from "../assets/award2.png";
import img3 from "../assets/award3.png";
import img4 from "../assets/award4.png";
import img5 from "../assets/award5.png";
import img6 from "../assets/award6.png";
import img7 from "../assets/award7.png";
import img8 from "../assets/award8.png";

const awardImages = [img1, img2, img3, img4, img5, img6, img7, img8];

const awardsList = [
  {
    title: "Admiring Leadership Award – IET (2024)",
    description:
      "Honored for exemplary leadership and innovation as a student founder shaping impactful communities.",
  },
  {
    title: "Excellent Website Creation Award - KCGCT CSE (2024)",
    description:
      "Recognized for outstanding design and development of high-impact web experience.",
  },
  {
    title: "Technical Icon Award – KCGCT CSE (2023)",
    description:
      "Celebrated as a standout technical leader and innovator within the department.",
  },
  {
    title: "SIH 2022 Winner",
    description:
      "National-level recognition at Smart India Hackathon for solving real-world problems with tech-driven solutions.",
  },
  {
    title: "Appreciation Award for Founding INNOCOM – KCGCT (2024)",
    description:
      "Acknowledged for pioneering an innovation-driven student community.",
  },
  {
    title: "Academic Topper – KCGCT (2023 & 2025)",
    description:
      "Consistently ranked among the top of the department, combining academic excellence with applied innovation.",
  },
  {
    title: "IET Smart City Challenge Winner (2023)",
    description:
      "Secured first place for developing scalable tech for smarter urban living.",
  },
  {
    title: "IGEN Energathon – 1st Place",
    description:
      "Won first prize in a national sustainability challenge for energy innovation.",
  },
];

const Awards = () => {
  const [showAll, setShowAll] = useState(false);
  const [hideViewMore, setHideViewMore] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // default image

  const [initialCount, setInitialCount] = useState(3);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const scrollRef = useRef(null);

  useEffect(() => {
    const updateInitialCount = () => {
      setInitialCount(window.innerWidth < 992 ? 4 : 3);
    };
    updateInitialCount();
    window.addEventListener("resize", updateInitialCount);
    return () => window.removeEventListener("resize", updateInitialCount);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && scrollRef.current.scrollTop > 0 && !hideViewMore) {
        setHideViewMore(true);
      }
    };
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [hideViewMore]);

  const visibleAwards = showAll ? awardsList : awardsList.slice(0, initialCount);
  return (
    <section className="awards-section bg-light">
      <h2 className="awards-title">AWARDS & ACHIEVEMENTS</h2>
      <div className="awards-container">
        <div className="awards-left">
          <img
  src={awardImages[selectedIndex]}
  alt="Awards"
  className="award-main-img"
/>

        </div>

        <div className="timeline-line">
          {(showAll ? awardsList.slice(0, initialCount) : visibleAwards).map((_, index, array) => (
            <React.Fragment key={index}>
              <div className="circle"></div>
              {index !== array.length - 1 && <div className="line-segment" />}
            </React.Fragment>
          ))}
        </div>

        <div className={`awards-right ${showAll ? "scroll-enabled" : ""}`} ref={scrollRef}>
          {visibleAwards.map((award, index) => (
            <div
              className="award-item"
              key={index}
              onMouseEnter={() => !isMobile && setSelectedIndex(index)}
onClick={() => isMobile && setSelectedIndex(index)}

            >
              <img src={logo} alt="logo" className="award-logo" />
              <div className="award-text">
                <h3 className="award-heading">{award.title}</h3>
                <p className="award-desc">{award.description}</p>
              </div>
            </div>
          ))}

          {!showAll && !hideViewMore && awardsList.length > initialCount && (
            <p
  className="view-more"
  onClick={() => {
    setShowAll(true);
    setTimeout(() => ScrollTrigger.refresh(), 300); // slight delay to wait for DOM reflow
  }}
>
  View More →
</p>

          )}
        </div>
      </div>
    </section>
  );
};

export default Awards;
