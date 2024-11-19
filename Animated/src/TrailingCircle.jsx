import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TrailingCircle = () => {
  const circleRef = useRef(null); // Ref for the circle

  useEffect(() => {
    const circle = circleRef.current;

    const updatePosition = (x, y) => {
      gsap.to(circle, {
        x: x,
        y: y,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e) => {
      const x = e.clientX + window.scrollX;
      const y = e.clientY + window.scrollY;
      updatePosition(x, y);
    };

    // Add scroll event handler
    const handleScroll = () => {
      const x = lastMouseX + window.scrollX;
      const y = lastMouseY + window.scrollY;
      updatePosition(x, y);
    };

    // Track last known mouse position
    let lastMouseX = 0;
    let lastMouseY = 0;
    const updateLastPosition = (e) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", updateLastPosition);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", updateLastPosition);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={circleRef}
      style={{
        width: "15px",
        height: "15px",
        backgroundColor: "red",
        borderRadius: "50%",
        position: "absolute",
        pointerEvents: "none", // Prevent interference with mouse events
        transform: "translate(-50%, -50%)", // Center the circle around the cursor
      }}
    ></div>
  );
};

export default TrailingCircle;
