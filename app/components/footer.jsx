"use client";
import React from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative font-sans font-semibold bg-black dark:bg-gray-900 text-white py-6 sm:py-8 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Company Section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-medium tracking-tight">Company</h3>
            <ul className="space-y-3 sm:space-y-4">
              {["About", "Careers", "News", "Privacy"].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-white hover:text-gray-300 transition-colors duration-300 inline-flex items-center group text-sm sm:text-base"
                  >
                    {item}
                    <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-medium tracking-tight">Support</h3>
            <ul className="space-y-3 sm:space-y-4">
              {["Contact", "FAQ", "Resources", "Accessibility"].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-white hover:text-gray-300 transition-colors duration-300 inline-flex items-center group text-sm sm:text-base"
                  >
                    {item}
                    <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-medium tracking-tight">Contact</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 sm:mr-3 text-neutral-400 mt-1" size={16} />
                <span className="text-white text-sm sm:text-base">
                  123 Design Avenue<br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 sm:mr-3 text-white" size={16} />
                <Link
                  href="tel:+1234567890"
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-sm sm:text-base"
                >
                  +1 (234) 567-890
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 sm:mr-3 text-white" size={16} />
                <Link
                  href="mailto:hello@example.com"
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-sm sm:text-base"
                >
                  hello@example.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-xs sm:text-sm">
            © {currentYear} Company. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-white text-xs sm:text-sm hover:text-gray-300 transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-white text-xs sm:text-sm hover:text-gray-300 transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-white text-xs sm:text-sm hover:text-gray-300 transition-colors duration-300"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;