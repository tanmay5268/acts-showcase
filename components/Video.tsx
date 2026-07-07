"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import video_cover from "@/public/video_cover.png";
import Image from "next/image";
import ScrambledText  from "@/components/ScrambledText";
import { gsap, CSSPlugin } from "gsap";
import { useGSAP } from "@gsap/react";
import { VscCodeOss } from "react-icons/vsc";
import { FaPlay, FaPause } from "react-icons/fa6";
import { Highlighter } from "@/components/ui/highlighter";
import { useLoading } from "@/context/LoadingContext";
import { NumberTicker } from "./ui/number-ticker";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCalendarCheck } from "react-icons/fa";
gsap.registerPlugin(CSSPlugin);
const Videos = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const { isLoaded } = useLoading();
  const hasLoaded = isLoaded();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const thumbnailRef = useRef<HTMLImageElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const mobileView =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;
  console.log(mobileView);
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };
  const mouseMove = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };
  const smoothMouseMove = {
    x: useSpring(mouseMove.x, { stiffness: 500, damping: 40, mass: 0.5 }),
    y: useSpring(mouseMove.y, { stiffness: 500, damping: 40, mass: 0.5 }),
  };
  const handleMouseEnter = () => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.to(cursor, { autoAlpha: 1, duration: 0.3, ease: "power1.out" });
    document.querySelector(".elem-cursor")?.classList.add("hidden");
    document.body.classList.add("video-cursor-active");
  };
  const handleMouseLeave = () => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.to(cursor, { autoAlpha: 0, duration: 0.3, ease: "power1.out" });
    document.querySelector(".elem-cursor")?.classList.remove("hidden");
    document.body.classList.remove("video-cursor-active");
    const video = videoRef.current;
    if (video) {
      video.pause();
      setPlaying(false);
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    mouseMove.x.set(e.clientX - rect.left);
    mouseMove.y.set(e.clientY - rect.top);
  };
  useGSAP(() => {
    const video = videoRef.current;
    const thumbnail = thumbnailRef.current;
    const wrapper = wrapperRef.current;

    if (!video || !thumbnail) return;

    const onPlay = () => {
      const tl = gsap.timeline();
      tl.to(thumbnail, { autoAlpha: 0, duration: 0.5, ease: "power1.out" });
    };

    const onPause = () => {
      gsap.to(thumbnail, { autoAlpha: 1, duration: 0.5, ease: "power1.out" });
    };
    if (hasLoaded) {
      gsap.from(wrapper, {
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power1.out",
      });
    } else {
      gsap.from(wrapper, {
        opacity: 0,
        duration: 1,
        delay: 4,
        ease: "power1.out",
      });
    }
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);
  useGSAP(() => {
    const about = aboutRef.current;
    if (!about) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: about,
        start: "top 90%",
        scrub: true,
      },
    });
    tl.from(about.querySelectorAll("#about"), {
      display: "hidden",
      opacity: 0,
      y: 24,
      duration: 2,
      ease: "power1.out",
    });
  });
  return (
    <div className="flex ">
        <div ref={aboutRef} className=" absolute w-full h-content ">
          <div className=" relative lg:w-115 max-xl:w-120 flex h-full">
            <div className="h-1/3 w-1/3  flex items-center " id="about">
              <div className=" relative p-3 h-full gap-3 flex flex-col justify-center items-center w-full">
                <div className="h-30  border-r border-slate-400 w-full absolute"></div>
                <div className="text-[#60a5fa] text-4xl w-10 h-10">
                  <VscCodeOss />
                </div>
                <div className=" flex items-center gap-1 flex-col">
                  <div className="flex text-4xl text-white items-end text-left justify-end">
                    <div className=" flex items-end-safe justify-end w-15">
                      <NumberTicker
                        className="text-white font-bold font-[space]"
                        value={50}
                      ></NumberTicker>
                    </div>
                    <span className="text-white font-[space]">+</span>
                  </div>
                  <h1 className="text-white">
                    <ScrambledText
                    style={{fontSize:"1.3vw",
                      textTransform:"uppercase",
                    }}
                      className="scrambled-text-demo "
                      radius={15}
                      duration={2}
                      speed={0.5}
                      scrambleChars="•"
                    >
                      Projects
                    </ScrambledText>
                  </h1>
                </div>
              </div>
            </div>
            <div className="h-1/3 w-1/3  flex items-center " id="about">
              <div className=" relative p-3 h-full gap-3 flex flex-col justify-center items-center w-full">
                <div className="h-30 border-r border-slate-400 w-full absolute"></div>
                <div className="text-[#60a5fa] text-4xl w-10 h-10">
                  <FaCalendarCheck />
                </div>
                <div className=" flex items-center gap-1 flex-col">
                  <div className="flex text-4xl text-white items-end text-left justify-end">
                    <div className=" flex">
                      <NumberTicker
                        className="text-white font-bold font-[space]"
                        value={8}
                      ></NumberTicker>
                    </div>
                    <span className="text-white font-[space]">+</span>
                  </div>
                  <h1 className=" text-white ">
                    <ScrambledText
                    style={{fontSize:"1.4vw",
                      textTransform:"uppercase",
                    }}
                      className="scrambled-text-demo "
                      radius={25}
                      duration={2}
                      speed={0.5}
                      scrambleChars="•"
                    >
                      events
                    </ScrambledText>
                  </h1>
                </div>
              </div>
            </div>
            <div className="h-1/3 w-1/3  flex items-center " id="about">
              <div className=" relative p-3 h-full gap-3 flex flex-col justify-center items-center w-full">
                <div className="h-30  border-slate-400 w-full absolute"></div>
                <div className="text-[#60a5fa] text-4xl w-10 h-10">
                  <BsFillPeopleFill />
                </div>
                <div className=" flex justify-center items-center gap-1 flex-col">
                  <div className="flex text-4xl text-white items-end text-left justify-end">
                    <div className=" flex">
                      <NumberTicker
                        className="text-white font-bold font-[space]"
                        value={400}
                      ></NumberTicker>
                    </div>
                    <span className="text-white font-[space]">+</span>
                  </div>
                  <h1 className=" text-white ">
                    <ScrambledText
                    style={{fontSize:"1.3vw",
                      textTransform:"uppercase",
                    }}
                      className="scrambled-text-demo "
                      radius={15}
                      duration={2}
                      speed={0.5}
                      scrambleChars="•"
                    >
                      Members
                    </ScrambledText>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div id="about" className="h-10 w-full  "></div>
          <div
            id="about"
            className="about-description text-left  text-white flex items-center justify-center text-xl font-[oswald]  h-70   "
          >
            <p className="w-[97%] h-full ">
              {" "}
              <Highlighter padding={4} color="#8466f3" action="highlight">
                ACTS
              </Highlighter>{" "}
              is a technical club at{" "}
              <Highlighter
                color="#60a5fa
                 "
                action="circle"
                iterations={3}
                padding={8}
              >
                Guru Gobind Singh Indraprastha
              </Highlighter>{" "}
              University (EDC) that promotes a collaborative environment for
              learning and innovation. The club, guided by Dr. Neeta Singh and
              Dr. Amar Arora, organizes{" "}
              <Highlighter color="#8466F3" action="underline">
                workshops, hackathons, and events
              </Highlighter>
              , in AI, ML, Automation, and Robotics. It also hosts career
              development sessions on resume building and interview preparation,
              helping students grow both technically and professionally.
            </p>
          </div>
        </div>
      

      <div
        ref={wrapperRef}
        className="relative  w-full h-2/3 max-sm:-translate-y-20  flex  justify-end "
      >
        <div
          ref={containerRef}
          className="absolute overflow-hidden md:-top-5 md:w-2/3 md:h-130 cursor-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <video
            ref={videoRef}
            onClick={handleVideoClick}
            className="w-full h-full object-cover cursor-pointer overflow-hidden"
          >
            <source src="/intro.mp4" type="video/mp4" />
          </video>
          <Image
            ref={thumbnailRef}
            src={video_cover}
            className="overflow-hidden absolute top-0 left-0 w-full h-full pointer-events-none object-cover"
            alt="Video Cover"
          />
        </div>
        <motion.div
          ref={cursorRef}
          className="cursor max-sm:hidden pointer-events-none opacity-0 absolute w-15 h-15 md:w-30 md:h-30 rounded-full bg-sky-600 translate-x-[-80%] translate-y-[-80%]"
          style={{
            left: smoothMouseMove.x,
            top: smoothMouseMove.y,
          }}
        >
          {playing ? (
            <FaPause className="text-white w-5 h-5 md:w-10 md:h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          ) : (
            <FaPlay className="text-white w-5 h-5 md:w-10 md:h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Videos;
