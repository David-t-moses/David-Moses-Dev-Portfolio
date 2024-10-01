"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-nav";
import {
  IconAddressBook,
  IconHome,
  IconLayersLinked,
  IconShoppingCartBolt,
  IconUser,
} from "@tabler/icons-react";
export function Navbar() {
  const navItems = [
    {
      name: "Home",
      title: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-white" />,
    },
    {
      name: "About",
      title: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4 text-white" />,
    },
    {
      name: "Services",
      title: "Services",
      link: "#services",
      icon: <IconShoppingCartBolt className="h-4 w-4 text-white" />,
    },
    {
      name: "Contact",
      title: "Contact",
      link: "#contact",
      icon: <IconAddressBook className="h-4 w-4 text-white" />,
    },
    {
      name: "Projects",
      title: "Projects",
      link: "#projects",
      icon: <IconLayersLinked className="h-4 w-4 text-white" />,
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} className="p-5" />
    </div>
  );
}
