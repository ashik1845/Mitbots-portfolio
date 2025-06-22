import React from "react";
import "../styles/Built.css";
    

const Built = () => {
  return (
    <section data-cursor-bg="dark" className="built-section">
      <h1 className="built-main-header">THINGS I’VE BUILT</h1>


      {/* MITBOTS */}
<div className="built-row">
  <div className="built-text built-left">
    <h2 className="built-title mitbots-title">MITBOTS</h2>
    <p className="built-role mitbots-role">Founder & CEO</p>
    <p className="built-description mitbots-description">
     As the founder & CEO of Mitbots, I lead a team of engineers and designers building smart, scalable, user-centric solutions across industries. a few lines of code, a few friends with ambition, and a belief that great ideas shouldn’t die in notebooks.</p>
  </div>
  <div className="built-image-container">
    <div className="built-image1 mitbots-image"></div>
  </div>
</div>

{/* INNOCOM */}
<div className="built-row built-reverse">
  <div className="built-text built-right">
    <h2 className="built-title innocom-title">INNOCOM</h2>
    <p className="built-role innocom-role">Co-Founder</p>
    <p className="built-description innocom-description">
   I co-founded INNOCOM — a student community that bridges the gap between theory and real-world tech. We host idea exchanges, product showcases, hackathons, and empower students to turn curiosity into code. </p>
  </div>
  <div className="built-image-container">
    <div className="built-image2 innocom-image"></div>
  </div>
</div>

{/* QUETOR */}
<div className="built-row">
  <div className="built-text built-left">
    <h2 className="built-title quetor-title">Quetor</h2>
    <p className="built-role quetor-role">Architect & Developer</p>
    <p className="built-description quetor-description">
   Built to ease the academic burden, Quetor is a secure, intelligent system that generates randomized question papers in minutes — eliminating manual errors, reducing leakage risk, and ensuring fairness across assessments. </p>
  </div>
  <div className="built-image-container">
    <div className="built-image1 quetor-image"></div>
  </div>
</div>

    </section>
  );
};

export default Built;
