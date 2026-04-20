"use client";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Technology", href: "/technology" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 text-white md:snap-start">
      <div className="max-w-ultra mx-auto px-6 lg:px-8 py-14 md:py-20">
        
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 md:mb-20">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-8" aria-label="TDI Homepage">
              <Image src="/TDI_logo_White.svg" alt="TDI Logo" width={20} height={60} className="h-10 md:h-12 w-auto" />
            </Link>
            <p className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-sm">
              AI-first professional services. We design and deploy production-grade automation systems for the modern enterprise.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm md:text-base text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-8">Contact</h4>
            <ul className="flex flex-col gap-6">
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-[#6CF2B0] mb-1">Email</span>
                <a href="mailto:connect@thedataisland.com" className="text-sm md:text-base text-white/50 hover:text-white transition-colors">
                  connect@thedataisland.com
                </a>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-[#6CF2B0] mb-1">Office</span>
                <p className="text-sm md:text-base text-white/50 font-light">
                  Singapore (HQ)<br />
                  Dhaka, Bangladesh
                </p>
              </li>
            </ul>
          </div>

          {/* Newsletter / Follow */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-8">Follow Us</h4>
            <div className="flex gap-4">
              {["X", "In", "Ig"].map((social) => (
                <Link 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/40 hover:text-[#6CF2B0] hover:border-[#6CF2B0] transition-all"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs tracking-widest">
            © {new Date().getFullYear()} TDI TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
