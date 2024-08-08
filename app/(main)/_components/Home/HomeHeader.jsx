import React from "react";
import { NavItems } from "./NavItems";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

async function HomeHeader() {
  const user = await currentUser();
  return (
    <div className="py-2 px-5 flex justify-center items-center shadow-lg  bg-[#111827]">
      <div className="w-full lg:w-[80%] flex gap-3 lg:gap-0 justify-between items-center">
        <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
        <NavItems />
        {user ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-[48px] w-[48px]",
              },
            }}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default HomeHeader;
