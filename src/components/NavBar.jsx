"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  FileCodeCorner, //for coding
  Volleyball, //for knitting
  BookOpenText, //for reading
  Footprints, //for walking
  Music, //for music
  House, //for home
  Menu, //for mobile menu
} from "lucide-react";

const NavBar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: <House size={18} /> },
    {
      name: "Coding",
      href: "/programming",
      icon: <FileCodeCorner size={18} />,
    },
    { name: "Knitting", href: "/knitting", icon: <Volleyball size={18} /> },
    { name: "Reading", href: "/reading", icon: <BookOpenText size={18} /> },
    { name: "Walking", href: "/walking", icon: <Footprints size={18} /> },
    { name: "Music", href: "/instruments", icon: <Music size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-habit-bg text-habit-text border-b border-habit-border px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold flex items-center gap-2 transition-transform hover:scale-105">
          <Link href="/" className="flex items-center gap-2">
            <span className="tracking-tight">Habit Tracker</span>
          </Link>
        </div>
        <ul className="hidden lg:flex space-x-8 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 transition-all duration-300 hover:text-habit-hover ${
                  pathname === link.href
                    ? "text-habit-hover border-b-2 border-habit-hover pb-1"
                    : "text-habit-text"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center lg:hidden">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="p-2 rounded-md hover:bg-white/10 transition-colors focus:outline-none">
                <Menu className="w-7 h-7 text-white" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[220px] bg-white rounded-xl p-2 shadow-2xl border border-habit-border mt-2 z-50 animate-in fade-in zoom-in duration-200"
                sideOffset={8}
                align="end"
              >
                {navLinks.map((link) => (
                  <DropdownMenu.Item
                    key={link.href}
                    className="flex items-center gap-3 p-3 text-sm font-semibold text-gray-700 outline-none rounded-lg cursor-pointer data-highlighted:bg-habit-bg/10 data-highlighted:text-habit-bg transition-colors"
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 w-full"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className="h-px bg-gray-100 my-1" />
                <DropdownMenu.Item className="flex items-center p-3 text-sm font-semibold text-red-600 outline-none rounded-lg cursor-pointer data-highlighted:bg-red-50 transition-colors">
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
