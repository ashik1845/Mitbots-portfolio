import React from "react";
import Marquee from "react-fast-marquee";
import "../styles/TechScroll.css";
import { useState, useEffect } from "react";


import figma from "../assets/Figmaa.png";
import reactjs from "../assets/Reactjs.png";
import reactnative from "../assets/reactnative.png";
import tailwind from "../assets/Tailwind.png";
import nextjs from "../assets/Next.png";
import vite from "../assets/Vite.png";
import electron from "../assets/Electronjs.png";
import avalonia from "../assets/avalonia.png";

import nodejs from "../assets/Nodejs.png";
import firebase from "../assets/Firebase.png";
import mongodb from "../assets/MongoDB.png";
import postgresql from "../assets/postgresSQL.png";
import dotnet from "../assets/NET.png";
import java from "../assets/Javaa.png";
import csharp from "../assets/Csharp.png";
import python from "../assets/Pythonn.png";

const line1 = [
  { img: figma, name: "Figma" },
  { img: reactjs, name: "React Js" },
  { img: reactnative, name: "React Native" },
  { img: tailwind, name: "Tailwind" },
  { img: nextjs, name: "Next Js" },
  { img: vite, name: "Vite" },
  { img: electron, name: "Electron Js" },
  { img: avalonia, name: "Avalonia UI" },
];

const line2 = [
  { img: nodejs, name: "Node Js" },
  { img: firebase, name: "Firebase" },
  { img: mongodb, name: "MongoDB" },
  { img: postgresql, name: "PostgreSQL" },
  { img: dotnet, name: ".NET" },
  { img: java, name: "Java" },
  { img: csharp, name: "C#" },
  { img: python, name: "Python" },
];

const TechScroll = () => {
  const [speed, setSpeed] = useState(70);

useEffect(() => {
  const updateSpeed = () => {
    const screenWidth = window.innerWidth;
    setSpeed(screenWidth <= 480 ? 40 : 70);
  };

  updateSpeed(); // Set initial speed

  window.addEventListener("resize", updateSpeed); // Update on resize

  return () => window.removeEventListener("resize", updateSpeed); // Cleanup
}, []);

  return (
    <section className="tech-section">
      <h1 className="toolbox-title">MY TOOLBOX</h1>

      {/* Line 1: Right End to Center */}
      <div className="marquee-container right-half">
        <Marquee
          direction="left"
          speed={speed}
          gradient={false}
        >
          {line1.map((tech, index) => (
            <div className="tech-item" key={`l1-${index}`}>
              <img src={tech.img} alt={tech.name} />
              <span>{tech.name}</span>
            </div>
          ))}
        </Marquee>
        <div className="fade-right-center" />
      </div>

      {/* Line 2: Left End to Center */}
      <div className="marquee-container left-half">
        <Marquee
          direction="right"
          speed={speed}
          gradient={false}
        >
          {line2.map((tech, index) => (
            <div className="tech-item" key={`l2-${index}`}>
              <img src={tech.img} alt={tech.name} />
              <span>{tech.name}</span>
            </div>
          ))}
        </Marquee>
        <div className="fade-left-center" />
      </div>
    </section>
  );
};

export default TechScroll;
