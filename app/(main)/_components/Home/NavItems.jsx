"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const resources = [
  "Key Modules",
  "Fact Sheet",
  "E Book",
  "Blog",
  "Success Stories",
  "Glosary",
];

const aboutUs = [
  "For Corporate",
  "Why Mockup Buddy",
  "Career",
  "Vision & Mission",
];

export function NavItems() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-white">
            Learn & Earn
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] bg-[#1a2330]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div>
                    <p className="text-sm font-light w-full text-white">
                      Master the art of interviews with Mockup Buddy. Enhance
                      your skills through practice, receive valuable feedback,
                      and earn rewards. Gain confidence and improve your
                      performance while building a portfolio of successful mock
                      interviews. Learn, grow, and achieve your career goals
                      with personalized guidance and support.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-white">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] bg-[#1a2330]">
              <li className="row-span-3 ">
                <NavigationMenuLink asChild>
                  <div className="flex flex-col w-full ">
                    {resources.map((r) => (
                      <div
                        key={r}
                        className="px-3 py-2 w-full hover:bg-[#111827] rounded-md"
                      >
                        <p className="text-sm font-light w-full text-white">
                          {r}
                        </p>
                      </div>
                    ))}
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-white">
            About Us
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] bg-[#1a2330]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div className="flex flex-col w-full">
                    {aboutUs.map((r) => (
                      <div
                        key={r}
                        className="px-3 py-2 w-full hover:bg-[#111827] rounded-md"
                      >
                        <p className="text-sm font-light w-full text-white">
                          {r}
                        </p>
                      </div>
                    ))}
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
