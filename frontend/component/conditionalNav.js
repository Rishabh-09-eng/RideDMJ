"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/component/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname==="/register" || pathname==="/admin") {
    return null;
  }

  return <Navbar />;
}