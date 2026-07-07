"use client";
import CircularGallery from "./CircularGallery";
import { useGSAP } from "@gsap/react";
const Galleryforus = () => {
  return (
    <div className="flex items-center justify-center h-125">
      <div className=" w-full relative h-full ">
        <div style={{ height: "600px", position: "relative" }}>
          <CircularGallery
            textColor="#ffffff"
            bend={0}
            borderRadius={0}
            scrollSpeed={1.5}
            scrollEase={0.10}
          />
        </div>
      </div>
    </div>
  );
};

export default Galleryforus;
