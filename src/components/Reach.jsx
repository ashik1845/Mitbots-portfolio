import React, { useEffect, useState } from "react";

import "../styles/Reach.css";
import rocketImg from "../assets/rocket.png";
import Select from "react-select";
const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "2px solid #2f2f2f63",
    boxShadow: "none",
    borderRadius: 0,
    fontFamily: "Montserrat, sans-serif",
    fontSize: "20px",
    paddingLeft: 0,
    paddingRight: 0,
    cursor: "pointer",
    outline: "none",
    "&:hover": {
      borderBottom: "2px solid #2f2f2f63",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "20px",
    color: "#2f2f2f63",
  }),
  placeholder: (base) => ({
    ...base,
    fontFamily: "Montserrat, sans-serif",
    fontSize: "20px",
    color: "#2f2f2f63",
    margin: 0,
    padding: 0,
  }),
  input: (base) => ({
    ...base,
    fontFamily: "Montserrat, sans-serif",
    fontSize: "20px",
    color: "#2F2F2F",
  }),
  singleValue: (base) => ({
    ...base,
    fontFamily: "Montserrat, sans-serif",
    fontSize: "20px",
    color: "#2F2F2F",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#2f2f2f63",
    padding: 0,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#F1DABF",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "16px",
    boxShadow: "none",
    borderRadius: 0,
    marginTop: 8,
    zIndex: 100,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#69391E" : "#F1DABF",
    color: state.isFocused ? "#fff" : "#2F2F2F",
    padding: "12px 16px",
    cursor: "pointer",
    fontFamily: "Montserrat, sans-serif",
  }),
};



const Reach = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);

useEffect(() => {
  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 1024);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const options = [
  { value: "collaboration", label: "Collaboration" },
  { value: "idea", label: "Bold Idea" },
  { value: "question", label: "Question" },
];
  return (
    <section className="reach-section bg-light">
      <div className="reach-left">
        <h1>
          LETS BUILD <br />
          <span className="highlight">SOMETHING</span> <br />
          TOGETHER
        </h1>
        <p>
          Got a bold idea, collaboration, or question? <br />
          I’d love to hear it. Pick a time, and let’s turn thoughts into action.
        </p>
        <img src={rocketImg} alt="Rocket" className="rocket-img" />
      </div>
      <div className="reach-right">
        <div className="input-row">
          <div className="input-group">
  <label className="input-label">Name</label>
  <input type="text" placeholder={isMobileView ? "Name" : ""} />
</div>
          <div className="input-group">
  <label className="input-label">Email</label>
  <input type="email" placeholder={isMobileView ? "Email" : ""} />
</div>
        </div>
        <div className="input-row">
          <div className="input-group">
  <label className="input-label">Phone Number</label>
  <input type="text" placeholder={isMobileView ? "+91  - - - - -  - - - - -" : ""} />
</div>

<div className="input-group">
  <label className="input-label">Subject</label>
  <Select
    options={options}
    classNamePrefix="rs"
    placeholder={isMobileView ? "Subject" : ""}
    styles={customSelectStyles}
  />
</div>

        </div>
        <button className="send-btn">Send Message</button>
      </div>
    </section>
  );
};

export default Reach;
