import Link from "next/link";
import React from "react";

const cardContent = [
  {
    title: "AI-Powered Interviews",
    description:
      "Create tailored interviews using advanced AI algorithms. Each interview is unique, designed to challenge and evaluate your skills effectively.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        color="#ec4899"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-bot"
      >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    ),
  },
  {
    title: "Voice-Driven Responses",
    description:
      "Respond to interview questions through voice recordings. Our system analyzes your speech to provide detailed feedback on clarity, tone, and content.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        color="#ec4899"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-audio-lines"
      >
        <path d="M2 10v3" />
        <path d="M6 6v11" />
        <path d="M10 3v18" />
        <path d="M14 8v7" />
        <path d="M18 5v13" />
        <path d="M22 10v3" />
      </svg>
    ),
  },
  {
    title: "Personalized Feedback",
    description:
      "Receive detailed, personalized feedback on your performance. Understand your strengths and areas for improvement with our in-depth analysis.",
    icon: (
      <svg
        color="#ec4899"
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-newspaper"
      >
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" />
        <path d="M15 18h-5" />
        <path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
  },
  {
    title: "Private and Secure",
    description:
      "Your interviews and feedback are kept confidential. Each user’s data is securely stored, ensuring that only you can access your interview history.",
    icon: (
      <svg
        color="#ec4899"
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-shield-check"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "In-Website Currency",
    description:
      "Purchase credits to create more interviews. Use your credits to unlock new features and take your interview practice to the next level.",
    icon: (
      <svg
        color="#ec4899"
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-coins"
      >
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h1v4" />
        <path d="m16.71 13.88.7.71-2.82 2.82" />
      </svg>
    ),
  },
  {
    title: "Custom Interview History",
    description:
      "Track your progress over time with a personalized interview history. Analyze past performances to see how much you’ve improved.",
    icon: (
      <svg
        color="#ec4899"
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-gallery-horizontal-end"
      >
        <path d="M2 7v10" />
        <path d="M6 5v14" />
        <rect width="12" height="18" x="10" y="3" rx="2" />
      </svg>
    ),
  },
];

function Hero() {
  return (
    <section className="bg-[#111827] text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ace Your Interviews with
            <br />
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-blue-800 text-transparent bg-clip-text">
              Mockup Buddy
            </span>{" "}
          </h2>

          <p className="mt-4 text-white">
            Transform your interview preparation with AI-driven mock interviews,
            personalized feedback, and detailed performance ratings. Get ready
            to shine in your next interview with Mockup Buddy.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cardContent.map((card, index) => (
            <a
              key={index}
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
            >
              {card.icon}

              <h2 className="mt-4 text-xl font-bold text-white">
                {card.title}
              </h2>

              <p className="mt-1 text-sm text-white">{card.description}</p>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={"http://localhost:3000/dashboard"}
            className="inline-block rounded-md bg-blue-600 px-12 py-3 text-sm font-normal text-white transition bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
