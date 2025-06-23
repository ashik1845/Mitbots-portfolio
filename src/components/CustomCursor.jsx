import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const requestRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const animate = () => {
    pos.current.x += (mouse.current.x - pos.current.x) * 0.9;
    pos.current.y += (mouse.current.y - pos.current.y) * 0.9;
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  const rgbToHex = (rgb) => {
    const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
    if (!result) return "";
    return (
      "#" +
      result
        .slice(1)
        .map((x) => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
        .toUpperCase()
    );
  };

  const getEffectiveColor = (el) => {
    while (el) {
      const manual = el.getAttribute?.("data-cursor-bg");
      if (manual === "light") return "#F1DABF";
      if (manual === "dark") return "#69391E";

      const bg = getComputedStyle(el).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
        return rgbToHex(bg);
      }
      el = el.parentElement;
    }

    const fallback = getComputedStyle(document.body).backgroundColor;
    return rgbToHex(fallback);
  };

  useEffect(() => {
    // ❌ Skip cursor below 480px
    if (window.innerWidth <= 480) return;

    const cursor = cursorRef.current;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      const colorHex = getEffectiveColor(el);

      if (colorHex === "#F1DABF") {
        cursor.style.backgroundColor = "#69391E";
      } else if (colorHex === "#69391E") {
        cursor.style.backgroundColor = "#F1DABF";
      } else {
        cursor.style.backgroundColor = "#69391E";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Only render on screens wider than 480px
  if (window.innerWidth <= 480) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#69391E",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate3d(0, 0, 0)",
        transition: "background-color 0.2s ease",
      }}
    />
  );
};

export default CustomCursor;
