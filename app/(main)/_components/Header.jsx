import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import UserCoins from "./UserCoins";
import Navigation from "./Navigation";
import Link from "next/link";

function Header() {
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Link className="flex-1" href={`http://localhost:3000/dashboard`}>
        <Image
          className="cursor-pointer"
          src={"/logo.svg"}
          width={40}
          height={40}
          alt="logo"
        />
      </Link>
      <Navigation />
      <div className="flex gap-5 items-center flex-1 justify-end">
        <UserCoins />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Header;
