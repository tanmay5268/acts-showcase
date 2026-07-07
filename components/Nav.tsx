"use client";
import VariableProximity from "./VariableProximity";
import Menu from "./Menu";
import { usePageTransition } from "@/context/TransitionContext";
import React from "react";
import Magnet from './Magnet'
import ACTS from "@/public/MAIN.svg"
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Nav = () => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const { navigateTo } = usePageTransition();
    const navRef = React.useRef<HTMLDivElement | null>(null);
    const variableTextProps = {
        className: 'variable-proximity-demo',
        fromFontVariationSettings: "'wght' 300",
        toFontVariationSettings: "'wght' 700",
        containerRef,
        radius: 110,
        falloff: 'gaussian' as const,
        style: { fontFamily: 'oswald, sans-serif' },
    };
    useGSAP(() => {
        if (!navRef.current) return;
        const tl = gsap.timeline();
        tl.from(navRef.current, { opacity: 0, duration: 1, delay: 4.3 })
        console.log("navAnimation running");
    })
    return (
        <div ref={navRef} className='z-10 relative mt-5 text-white min-w-11/12 flex items-center justify-between  h-16'>
            <div className="left w-1/3 h-full flex items-center justify-between gap-4 ml-10">
                <Menu></Menu>
                <div className="max-sm:hidden absolute max-sm:left-17 md:left-19 ">
                    <Magnet magnetStrength={20}>
                        <Image src={ACTS} className="ml-10 max-sm:w-50  md:h-60 md:w-60" alt="ACTS" />
                    </Magnet>
                </div>
                <div className="md:hidden absolute text-white font-[oswald] tracking-tighter text-center text-5xl left-17">
                        ACTS
                </div>
            </div>
            <div ref={containerRef} className="right z-10 max-md:hidden w-1/3 relative h-full md:flex items-center justify-end gap-4 mr-10">
                <button onClick={() => {
                    navigateTo('/teams')
                }} className="w-1/3 tracking-wider text-center text-lg uppercase cursor-pointer">
                        <VariableProximity
                            label={'Teams'}
                            {...variableTextProps}
                        />
                    
                </button>
                <button onClick={() => {
                    navigateTo('/events')
                }} className="w-1/3 tracking-wider text-lg  text-center uppercase cursor-pointer">
                        <VariableProximity
                            label={'EVENTS'}
                            {...variableTextProps}
                        />
                </button>
                <button onClick={() => {
                    navigateTo('/faq')
                }} className="w-1/3 tracking-wider text-lg  text-center uppercase cursor-pointer">
                        <VariableProximity
                            label={'FAQ'}
                            {...variableTextProps}
                        />
                </button>
            </div>
        </div>
    )
}

export default Nav
