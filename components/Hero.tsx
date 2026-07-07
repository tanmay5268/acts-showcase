"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ShinyText from "./ShinyText";
import { useLoading } from "@/context/LoadingContext";
const HERO_LINES = ["we build", "real-world", "tech experience", "that matters"];

const Hero = () => {
    const heroRef = React.useRef<HTMLDivElement | null>(null);
    const { isLoaded } = useLoading();
    const aboutRef = React.useRef<HTMLDivElement | null>(null);
    const hasLoaded = isLoaded();
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        if (!heroRef.current) return;
        if (typeof window === "undefined") return;
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        if (!isDesktop) return;
        const lines = heroRef.current.querySelectorAll(".hero-line");
        const chars = heroRef.current.querySelectorAll(".hero-char");

        gsap.set(lines, { autoAlpha: 1 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (hasLoaded) {
            tl.from(lines, {
                y: 24,
                autoAlpha: 0,
                duration: 0.45,
                stagger: 0.14,
                delay: 0.1,
            }).from(chars, {
                y: 120,
                z: -240,
                rotateX: -75,
                scale: 0.7,
                filter: "blur(8px)",
                autoAlpha: 0,
                transformOrigin: "50% 100%",
                duration: 0.75,
                stagger: {
                    each: 0.02,
                    from: "start",
                },
                delay: 0.1,
            }, "-=0.25");
        }
        else {
            tl.from(lines, {
                y: 24,
                autoAlpha: 0,
                duration: 0.45,
                stagger: 0.14,
                delay: 1.5,
            }).from(chars, {
                y: 120,
                z: -240,
                rotateX: -75,
                scale: 0.7,
                filter: "blur(8px)",
                autoAlpha: 0,
                transformOrigin: "50% 100%",
                duration: 0.75,
                stagger: {
                    each: 0.02,
                    from: "start",
                },
                delay: 1.5,
            }, "-=0.25");
        }

    }, { scope: heroRef });
    useGSAP(() => {
        if (!aboutRef.current) return;
        const elem = aboutRef.current;
        gsap.set(elem, { autoAlpha: 0, y: 24 });
        gsap.timeline({
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
                once: true,
                scrub: 1,
            },
        }).to(elem, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" });
    }, { scope: aboutRef });
    function renderChars(line: string) {
        if (line === "real-world") {
            return <ShinyText speed={2} spread={60} shineColor="#8466F3" color="#0084d1" direction="left" yoyo text={line} className=" hero-char inline-block" />
        }
        if (line === "tech experience") {
            return Array.from(line).map((char, index) => (
                <span key={`${line}-${index}`} className='tracking-tight hero-char special inline-block'>
                    {char === " " ? "\u00A0" : char}
                </span>
            ));
        }
        return Array.from(line).map((char, index) => (
            <span key={`${line}-${index}`} className='hero-char inline-block'>
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    }

    return (
        <div className='relative text-white max-sm:w-screen  max-sm:h-95  md:w-screen md:h-screen'>
            {/* <div ref={aboutRef} className=" text-white relative w-110 text-left font-extralight  text-2xl left-2 top-190 sm:left-10 md:left-16 max-sm:hidden">
                <VariableProximity
                className=" text-extralight text-2xl left-2 top-190 sm:left-10 md:left-16 max-sm:hidden"
                    label="ACTS is a technical club at Guru Gobind Singh Indraprastha University (East Delhi Campus) that promotes a collaborative environment for learning and innovation. It also hosts career development sessions on resume building and interview preparation, helping students grow both technically and professionally."
                    containerRef={aboutRef}
                    radius={30}
                    fromFontVariationSettings="'wght' 300"
                    toFontVariationSettings="'wght' 700"
                ></VariableProximity>

            </div> */}
            <div
                ref={heroRef}
                className='absolute max:sm:-translate-x-1/2 max-sm:top-[36%] top-[26%] max-sm:left-4 max-sm:text-[14.7vw] md:left-[24%] lg:left-[32%]  overflow-hidden flex flex-col text-left uppercase font-[oswald] leading-none text-[14vw] sm:text-[11vw] md:text-[9vw]'
            >
                {HERO_LINES.map((line) => (
                    <div key={line} className='overflow-hidden'>
                        <div className=' hero-line whitespace-nowrap'>{renderChars(line)}</div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Hero
