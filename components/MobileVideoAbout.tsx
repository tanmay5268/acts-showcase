"use client";
import React from "react";
import video_cover from "@/public/video_cover.png";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import gsap from "gsap";

const mobileVideoAbout = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const thumbnailRef = React.useRef<HTMLDivElement>(null);

  const fadeOutThumbnail = () => {
    if (!thumbnailRef.current) return;
    const overlay = thumbnailRef.current;
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        overlay.style.pointerEvents = "none";
      },
    });
  };

  const fadeInThumbnail = () => {
    if (!thumbnailRef.current) return;
    const overlay = thumbnailRef.current;
    overlay.style.pointerEvents = "auto";
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    fadeOutThumbnail();
    void video.play();
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    fadeInThumbnail();
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      handlePlay();
      return;
    }
    handlePause();
  };
  return (
    <div className="relative flex flex-col items-center justify-center h-150 ">
      <div className="relative w-full h-70">
        <div className="absolute top-5">
          <video ref={videoRef} playsInline loop onClick={handleVideoClick}>
            <source src="/intro.mp4" type="video/mp4" />
          </video>
          <div
            ref={thumbnailRef}
            className="absolute w-screen object-cover top-0 left-0 h-full"
          >
            <Image
              className="overflow-hidden absolute top-0 left-0 w-full h-full pointer-events-none object-cover"
              src={video_cover}
              alt="Video Cover"
            />
            <div className="flex items-center justify-center w-full h-full  absolute top-0 left-0">
              <button
                onClick={handlePlay}
                className=" opacity-70 flex items-center bg-sky-500 justify-center rounded-full w-15 h-15"
              >
                <FaPlay className="text-white text-2xl"></FaPlay>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" relative w-screen h-1/2 text-white">
        add about club and description here
      </div>
    </div>
  );
};

export default mobileVideoAbout;
