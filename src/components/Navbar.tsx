"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const isVisible = !isScrolled || isHovered || isMobileMenuOpen;
  const isActive = isScrolled || isMobileMenuOpen;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const container = document.getElementById("main-scroll-container");
      const scrollY = container ? container.scrollTop : window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    // Listen on both to be safe across different page structures
    const container = document.getElementById("main-scroll-container");
    if (container) container.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      document.getElementById("main-scroll-container")?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    const lockScroll = (lock: boolean) => {
      const mainContainer = document.getElementById("main-scroll-container");
      if (lock) {
        document.body.style.overflow = "hidden";
        if (mainContainer) mainContainer.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
        if (mainContainer) mainContainer.style.overflow = "auto";
      }
    };

    if (isMobileMenuOpen) {
      lockScroll(true);
      // Move focus into menu
      mobileMenuRef.current?.focus();
    } else {
      lockScroll(false);
    }
    
    return () => lockScroll(false); // Cleanup on unmount
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "Technology", href: "/technology" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Invisible hover trigger area at the top of the viewport - only active when scrolled */}
      {isScrolled && !isVisible && (
        <div 
          className="fixed top-0 left-0 right-0 h-6 z-[120] bg-transparent"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}

      {/* Skip to main content – visible on focus (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:px-4 focus:py-2 focus:bg-[#6CF2B0] focus:text-black focus:font-semibold focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      <nav
        role="navigation"
        aria-label="Main navigation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 z-[100] h-[80px] flex items-center transition-all duration-300 ease-in-out ${
          isVisible 
            ? "translate-y-0 opacity-100" 
            : "translate-y-[-100%] opacity-0"
        } ${isActive
          ? "bg-white shadow-xl rounded-b-[32px] border-b border-gray-100"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-ultra mx-auto w-full px-6 flex justify-between items-center">
          {/* Left side: Logo */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center shrink-0"
            aria-label="TDI — Return to homepage"
          >
            <Image
              src={isActive ? "/TDI_logo_Black.svg" : "/TDI_logo_White.svg"}
              alt="TDI Logo"
              width={20}
              height={100}
              className="h-14 md:h-20 w-auto mix-blend-normal transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Right side navigation links & CTA (Desktop/Tablet Landscape) */}
          <div className="hidden lg:flex items-center gap-10">
            <ul role="list" className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => trackEvent("nav_click", { link_name: link.name, link_url: link.href })}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-textDark hover:text-accentTeal" : "text-white/90 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Primary CTA button */}
            <Link
              href="/contact"
              onClick={() => trackEvent("cta_click", { cta_name: "Request Automation Audit (Desktop Nav)" })}
              className={`px-6 py-3 rounded-button text-sm font-semibold text-white transition-all duration-300 shadow-md hover:opacity-90 ${
                isHovered ? "bg-black" : "bg-accentTeal"
              }`}
            >
              Request Automation Audit
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger/Close) */}
          <button
            ref={hamburgerRef}
            className={`lg:hidden p-2 -mr-2 transition-colors duration-300 ${isActive ? "text-textDark" : "text-white"
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        tabIndex={-1}
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col h-full pt-[100px] px-6 pb-12 overflow-y-auto">
          <ul role="list" className="flex flex-col gap-6 text-2xl font-light mb-12">
            {navLinks.map((link) => (
              <li key={link.name} className="border-b border-gray-100 pb-4">
                <Link
                  href={link.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    trackEvent("nav_click", { link_name: link.name, link_url: link.href, mobile: true });
                  }}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="text-textDark hover:text-accentTeal transition-colors flex justify-between items-center"
                >
                  {link.name}
                  <span aria-hidden="true" className="text-gray-300 text-sm">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <Link
              href="/contact"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackEvent("cta_click", { cta_name: "Request Automation Audit (Mobile Nav)" });
              }}
              className="block w-full text-center bg-accentTeal text-white px-6 py-4 rounded-button font-medium hover:opacity-90 transition-all duration-300"
            >
              Request Automation Audit
            </Link>

            <p className="text-sm text-textMuted text-center mt-6 font-light">
              TDI © {mounted ? new Date().getFullYear() : ""} Modern Enterprise
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
