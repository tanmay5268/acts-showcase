"use client";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { usePageTransition } from "@/context/TransitionContext";
import Text3DFlip from "@/components/ui/text-3d-flip";
import gsap from "gsap";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Teams", href: "/teams" },
  { label: "Events", href: "/events" },
  { label: "FAQ", href: "/faq" },
];

const Menu = () => {
  const { navigateTo } = usePageTransition();
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const isClosingRef = React.useRef(false);

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const circleRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const timelineRef = React.useRef<gsap.core.Timeline | null>(null);

  const getButtonCenter = React.useCallback(() => {
    if (!buttonRef.current) {
      return { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    }

    const rect = buttonRef.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }, []);

  const getTargetScale = React.useCallback((x: number, y: number) => {
    const diameter = circleRef.current?.offsetWidth ?? 60;

    const distances = [
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y),
    ];

    const furthestCorner = Math.max(...distances);
    return (furthestCorner * 2) / diameter + 0.2;
  }, []);

  const closeMenu = React.useCallback((onComplete?: () => void) => {
    if (!overlayRef.current || !circleRef.current || !contentRef.current)
      return;
    if (isClosingRef.current) return;

    isClosingRef.current = true;

    const menuItems = contentRef.current.querySelectorAll(".menu-item");
    const menuItemTexts =
      contentRef.current.querySelectorAll(".menu-item-text");

    timelineRef.current?.kill();
    timelineRef.current = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        if (!overlayRef.current || !circleRef.current) return;
        gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(circleRef.current, { autoAlpha: 0, scale: 1 });
        setIsMenuOpen(false);
        isClosingRef.current = false;
        onComplete?.();
      },
    });

    timelineRef.current
      .to(menuItemTexts, {
        yPercent: 120,
        autoAlpha: 0,
        stagger: -0.05,
        duration: 0.24,
        ease: "power3.in",
      })
      .to(menuItems, { autoAlpha: 0, duration: 0.16 }, "<")
      .to(contentRef.current, { autoAlpha: 0, duration: 0.18 }, "<")
      // close timing control
      .to(
        circleRef.current,
        { scale: 1, duration: 0.8, ease: "circ.out" },
        "<",
      );
  }, []);

  const openMenu = React.useCallback(() => {
    if (!overlayRef.current || !circleRef.current || !contentRef.current)
      return;

    const { x, y } = getButtonCenter();
    const targetScale = getTargetScale(x, y);
    const menuItems = contentRef.current.querySelectorAll(".menu-item");
    const menuItemTexts =
      contentRef.current.querySelectorAll(".menu-item-text");

    setIsMenuOpen(true);
    timelineRef.current?.kill();

    gsap.set(overlayRef.current, { autoAlpha: 1, pointerEvents: "auto" });
    gsap.set(circleRef.current, {
      x,
      y,
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 1,
      scale: 1,
    });
    gsap.set(contentRef.current, { autoAlpha: 0 });
    gsap.set(menuItems, { autoAlpha: 1 });
    gsap.set(menuItemTexts, {
      yPercent: 120,
      autoAlpha: 0,
      rotateX: 16,
      transformOrigin: "50% 100%",
    });

    timelineRef.current = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    timelineRef.current
      // open timing control
      .to(circleRef.current, {
        scale: targetScale,
        duration: 1,
        ease: "power3.inOut",
      })
      .to(contentRef.current, { autoAlpha: 1, duration: 0.2 }, "-=0.2")
      .to(
        menuItemTexts,
        {
          yPercent: 0,
          rotateX: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "back.out(1.45)",
        },
        "-=0.05",
      );
  }, [getButtonCenter, getTargetScale]);

  React.useEffect(() => {
    if (!overlayRef.current || !circleRef.current || !contentRef.current)
      return;

    gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(circleRef.current, { autoAlpha: 0, scale: 1 });
    gsap.set(contentRef.current, { autoAlpha: 0 });
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeMenu, isMenuOpen]);

  React.useEffect(() => {
    const handleResize = () => {
      if (!isMenuOpen || !circleRef.current) return;
      const { x, y } = getButtonCenter();
      const scale = getTargetScale(x, y);
      gsap.to(circleRef.current, {
        x,
        y,
        scale,
        duration: 0.2,
        overwrite: true,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getButtonCenter, getTargetScale, isMenuOpen]);

  React.useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
      return;
    }

    openMenu();
  };

  return (
    <div className="fixed z-20">
      <div className="absolute rounded-full top-0 left-0 w-15 h-full flex items-center justify-start gap-4 ml-10 z-50 pointer-events-none">
        <div className="relative bg-[#8466F3] transition duration-300 w-15 h-15 rounded-full flex items-center justify-center pointer-events-auto">
          <button
            ref={buttonRef}
            className="relative z-10 text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu-overlay"
          >
            {isMenuOpen ? (
              <RxCross1 className="w-7 h-7" />
            ) : (
              <RxHamburgerMenu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      <div
        id="site-menu-overlay"
        ref={overlayRef}
        className="fixed inset-0 z-40"
        aria-hidden={!isMenuOpen}
      >
        <div
          ref={circleRef}
          className="absolute h-15 w-15 rounded-full bg-[#8466F3]"
        />

        <div
          ref={contentRef}
          className="absolute inset-0 flex items-center md:w-2/3  justify-center"
        >
          <nav
            className="flex flex-col h-100 md:h-150 justify-around items-center gap-6"
            aria-label="Main menu"
          >
            {MENU_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                className="group max-sm:h-40  md:h-100 overflow-hidden menu-item font-[BoldFace] uppercase text-white text-6xl md:text-7xl font-semibold tracking-tight leading-none flext items-center justify-center pointer-events-auto"
                onClick={() => {
                  closeMenu(() => {
                    navigateTo(item.href);
                  });
                }}
              >
                <span className=" items-center h-full flex md:h-30   overflow-hidden">
                  <span className="menu-item-text h-2/3 block  transition-colors duration-500 group-hover:text-black">
                    <Text3DFlip
                     staggerDuration={0.09}
                     staggerFrom="last"
                      className="bg-background"
                      textClassName="bg-background text-foreground"
                      flipTextClassName="bg-background text-foreground"
                      rotateDirection="top"
                    >
                        {item.label}
                    </Text3DFlip>
                    
                  </span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Menu;
