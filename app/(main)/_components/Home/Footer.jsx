import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <div className="bg-[#282828] h-max justify-center flex py-7">
      <div className="flex flex-col w-[70%]">
        <div className="flex gap-4 flex-col md:flex-row md:gap-0 justify-between items-center ">
          <p className="font-semibold text-white text-xl">Mockup Buddy</p>
          <div className="flex flex-col gap-1 w-max">
            <Button
              className="border border-white px-8 font-normal"
              variant={"myBtn"}
            >
              Schedule 1-on-1 call
            </Button>
            <p className="text-sm text-white font-light">
              Speak with our Learning Advisor
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col text-sm text-white font-extralight gap-1">
          <h1 className="text-lg font-normal">Contact Us</h1>
          <p>
            Email us for Product Management Queries: admissions@mockupbuddy.com{" "}
          </p>
          <p>Email us for Data Science Queries: admissions@mockupbuddy.com </p>
          <p>Helpline number: +91 9867656454 </p>
          <div className="flex flex-col mt-2 gap-2">
            <h1 className="text-lg font-normal">Follow Us</h1>
            <div className="flex gap-4">
              <svg
                className="cursor-pointer"
                color="#E1306C"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <svg
                className="cursor-pointer"
                color="#1DA1F2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <svg
                className="cursor-pointer"
                color="#1877F2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <svg
                className="cursor-pointer"
                color="#0077B5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
