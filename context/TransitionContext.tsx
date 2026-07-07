"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

const TransitionContext = createContext<{ navigateTo: (href: string) => void }>(
  { navigateTo: () => {} },
);

export const usePageTransition = () => useContext(TransitionContext);

export default function TransitionProvider({
  children,
  column = 7,
}: {
  children: ReactNode;
  column?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (!isTransitioning.current) return;
    const cols = colRefs.current;
    gsap.to(cols, {
      y: "-100%",
      duration: 1,
      ease: "power3.inOut",
      stagger: 0.07,
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  }, [pathname]);

  const navigateTo = useCallback(
    (href: string) => {
      if (isTransitioning.current) return;
      if (pathname === href) return;

      isTransitioning.current = true;
      const cols = colRefs.current;
      gsap.set(cols, { y: "100%" });

      gsap.to(cols, {
        y: "0%",
        duration: 1,
        ease: "power3.inOut",
        stagger: 0.07,
        onComplete: () => {
          router.push(href);
        },
      });
    },
    [router, pathname],
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      <div className="w-screen h-screen fixed inset-0 z-50 flex cursor-none pointer-events-none">
        {Array.from({ length: column }).map((_, idx) => (
          <div
            key={idx}
            ref={(el) => {
              colRefs.current[idx] = el;
            }}
            className="w-full h-full bg-[#8B5CF6] pointer-events-none"
            style={{ transform: "translateY(100%)" }}
          >
            {idx === 3 && (
              <div className="flex items-center justify-center h-full w-full">
                <div className="w-20 text-[#130239]">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="7.33" height="7.33">
                  <animate
                    id="spinner_oJFS"
                    begin="0;spinner_5T1J.end+0.2s"
                    attributeName="x"
                    dur="0.6s"
                    values="1;4;1"
                  ></animate>
                  <animate
                    begin="0;spinner_5T1J.end+0.2s"
                    attributeName="y"
                    dur="0.6s"
                    values="1;4;1"
                  ></animate>
                  <animate
                    begin="0;spinner_5T1J.end+0.2s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                  <animate
                    begin="0;spinner_5T1J.end+0.2s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                </rect>
                <rect x="8.33" y="1" width="7.33" height="7.33">
                  <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="x"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="y"
                    dur="0.6s"
                    values="1;4;1"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                </rect>
                <rect x="1" y="8.33" width="7.33" height="7.33">
                  <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="x"
                    dur="0.6s"
                    values="1;4;1"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="y"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                </rect>
                <rect x="15.66" y="1" width="7.33" height="7.33">
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="x"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="y"
                    dur="0.6s"
                    values="1;4;1"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                </rect>
                <rect x="8.33" y="8.33" width="7.33" height="7.33">
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="x"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="y"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                </rect>
                <rect x="1" y="15.66" width="7.33" height="7.33">
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="x"
                    dur="0.6s"
                    values="1;4;1"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="y"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                </rect>
                <rect x="15.66" y="8.33" width="7.33" height="7.33">
                  <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="x"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="y"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                </rect>
                <rect x="8.33" y="15.66" width="7.33" height="7.33">
                  <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="x"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="y"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                </rect>
                <rect x="15.66" y="15.66" width="7.33" height="7.33">
                  <animate
                    id="spinner_5T1J"
                    begin="spinner_oJFS.begin+0.4s"
                    attributeName="x"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.4s"
                    attributeName="y"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.4s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                  <animate
                    begin="spinner_oJFS.begin+0.4s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                  ></animate>
                </rect>
              </svg>
            </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </TransitionContext.Provider>
  );
}
