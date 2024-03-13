"use client";

import Countdown from "react-countdown";

import { BurnMouse } from "@magaiba-index/components/BurnMouse";

export default function Shop() {
  return (
    <>
      <BurnMouse />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
        🔥
        <p className="">
          Start buying{" "}
          <span className="bg-gradient-to-r from-red-500 to-fuchsia-500 inline-block text-transparent bg-clip-text">
            MAGAIBA
          </span>{" "}
          merch and burning in
        </p>
        <Countdown date={Date.parse("2024-03-13 12:00")} className="text-6xl" />
      </main>
    </>
  );
}
