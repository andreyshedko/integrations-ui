"use client";

import { useState } from "react";

const LanguageSelectMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const callsToAction = [
    {
      name: "English",
      href: "/en",
    },
    {
        name: "Czech",
        href: "/cz",
      },
  ];

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 text-gray-600"
        onMouseEnter={() => setIsOpen(!isOpen)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
      {isOpen && (
        <div className="absolute flex flex-col divide-x divide-gray-900/5 bg-gray-50 top-[5.5vh] right-[14.5vw]">
          {callsToAction.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
            >
              {/* <item.icon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              /> */}
              {item.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default LanguageSelectMenu;
