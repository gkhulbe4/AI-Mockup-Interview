"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const path = usePathname();
  // console.log(path);
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard" && "text-blue-600 font-bold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer ${
            path === "/questions" && "text-blue-600 font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer ${
            path === "/upgrade" && "text-blue-600 font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer ${
            path === "/howitworks" && "text-blue-600 font-bold"
          }`}
        >
          How it works
        </li>
      </ul>
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "h-[48px] w-[48px]",
          },
        }}
      />
    </div>
  );
}

export default Header;
