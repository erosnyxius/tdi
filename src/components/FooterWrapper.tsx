"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // List of pages that have their own Footer inside a snapping container
  const snappingPages = [
    "/",
    "/solutions",
    "/technology",
    "/case-studies",
    "/insights",
    "/about",
    "/contact"
  ];
  
  if (snappingPages.includes(pathname)) {
    return null;
  }

  return <Footer />;
}

