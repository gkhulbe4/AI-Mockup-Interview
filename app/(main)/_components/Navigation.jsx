"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

function Navigation() {
  const router = useRouter();
  const path = usePathname();
  // console.log(path);
  return (
    <ul className="hidden md:flex gap-6 flex-1 justify-center items-center">
      <li
        className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer font-medium ${
          path === "/dashboard" && "text-blue-600 "
        }`}
        onClick={() => router.push("/dashboard")}
      >
        Dashboard
      </li>
      <li
        className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer font-medium ${
          path === "/howitworks" && "text-blue-600 "
        }`}
        onClick={() => router.push("/howitworks")}
      >
        How it works
      </li>
    </ul>
  );
}

export default Navigation;
