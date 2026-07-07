"use client";
import { useLoading } from "@/context/LoadingContext";
import { gsap, CSSPlugin } from "gsap";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import NumberFlow from "@number-flow/react"
gsap.registerPlugin(CSSPlugin);
const Loader = () => {
    const { isLoaded, markAsLoaded } = useLoading();
    const hasLoaded = isLoaded();
    const [counter, setCounter] = useState(hasLoaded ? 100 : 0);
    const [showLoading, setShowLoading] = useState(!hasLoaded);
    useEffect(() => {
        if (!hasLoaded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [hasLoaded]);
    useEffect(() => {
        // Skip counter animation if already loaded once
        if (isLoaded()) return;

        const count = setInterval(() => {
            setCounter((counter) => {
                if (counter < 100) {
                    return counter + 1;
                }
                else {
                    clearInterval(count)
                    return 100;
                }
            });
        }, 10);

        return () => clearInterval(count);
    });
    useGSAP(() => {
        if (isLoaded()) return;
        if (counter === 0){
            const tl = gsap.timeline();
            tl.from(".number-flow", {display: "none"})
        }
        if (counter === 100) {
            const tl = gsap.timeline();
            tl.to(".loading-container", { opacity: 0, duration: 1, delay: 0.4, ease: "power1.inOut" })
            tl.to(".stairs > div", { y: '-100%', duration: 0.8, stagger: 0.05, ease: "power3.inOut" })
            tl.to(".loading-container", { display: "none" })
            tl.to(".stairs > div", { display: "none" })
            tl.call(() => {
                markAsLoaded();
                setShowLoading(false);
            })
        }
    }, [counter])
    return (
        <div className="w-screen h-screen fixed top-0 left-0 z-100 pointer-events-none">
            {/* loading */}
            {showLoading && <div className="loading-container pointer-events-none flex items-center justify-center overflow-hidden z-10 absolute w-screen h-screen bg-[#12032100]">
                <div className="loading-text tracking-tight text-[#2b263e] w-full text-9xl mr-80  font-[space] flex justify-center items-center">
                    <NumberFlow className="number-flow text-right font-[space] w-50" value={counter} />
                </div>
            </div>}

            {/* stairs for */}
            {showLoading && <div className="stairs absolute z-9 flex pointer-events-none w-screen h-screen">
                <div className="h-full flex-1 bg-indigo-400"></div>
                <div className="h-full flex-1 bg-indigo-400"></div>
                <div className="h-full flex-1 bg-indigo-400"></div>
                <div className="h-full flex-1 bg-indigo-400"></div>
                <div className="h-full flex-1 bg-indigo-400"></div>
                <div className="h-full flex-1 bg-indigo-400"></div>
                {/* add gradient later */}
            </div>}
            {/* transition for mobile */}
            {showLoading && <div className="stairs sm:hidden absolute z-9 w-screen h-screen">
                <div className="w-full h-full bg-[#83A6EA]"></div>
            </div>}
            {/* main content */}
        </div>
    )
}

export default Loader
