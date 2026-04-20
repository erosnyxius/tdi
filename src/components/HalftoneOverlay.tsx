import React from "react";

const HalftoneOverlay: React.FC = () => {
  const maskGradient = "radial-gradient(circle at 45% 40%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 85%)";
  
  return (
    <div 
      className="absolute inset-[-60%] z-0 pointer-events-none opacity-35"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.32) 2px, transparent 2.2px)",
        backgroundSize: "18px 18px",
        transform: "rotate(-25deg) scale(1.8) perspective(800px) rotateX(25deg)",
        maskImage: maskGradient,
        WebkitMaskImage: maskGradient,
        filter: "url(#meshWarp)",
      }}
    />
  );
};

export default HalftoneOverlay;
