"use client";

import ReactSpeedometer from "react-d3-speedometer";

import { useGentlenessIndex } from "@magaiba-index/hooks/useGentleIndex";
import { useMagaibaRadio } from "@magaiba-index/hooks/useMagaibaRadio";
import Link from "next/link";
import { useEffect, useState } from "react";

const MAX_VALUE = 1000;

export default function App() {
  const { isPlaying, toggleMagaibaRadio } = useMagaibaRadio();
  const { gentlenessValue, sentimentValue } = useGentlenessIndex();
  const [dancingValue, setDancingValue] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      setInterval(() => {
        const multiplier = gentlenessValue < MAX_VALUE ? 1 : -1;
        setDancingValue(gentlenessValue * (multiplier + Math.random() * 0.05));
      }, 500);
    } else {
      setDancingValue(0);
    }
  }, [isPlaying, gentlenessValue]);

  const value = (dancingValue || gentlenessValue) * MAX_VALUE;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <section className="flex flex-col gap-10 justify-center items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit  rounded-xl border p-4 bg-zinc-800/30">
          <p className="text-center">
            <b className="bg-gradient-to-r from-red-500 to-fuchsia-500 inline-block text-transparent bg-clip-text text-4xl">
              Magaiba
            </b>
            <br />
            <span>Gentleness index</span>
          </p>
          <ReactSpeedometer
            height={200}
            currentValueText={`Now: ${sentimentValue}`}
            textColor="white"
            segments={MAX_VALUE}
            maxSegmentLabels={0}
            needleColor="white"
            needleTransitionDuration={MAX_VALUE}
            value={Math.min(value, isPlaying ? value : MAX_VALUE)}
            startColor="red"
            endColor="fuchsia"
          />
          <div
            className="flex items-center text-center text-3xl"
            onClick={toggleMagaibaRadio}
          >
            {isPlaying ? "⏸︎" : "▶️"}
          </div>
        </section>
        <section className="flex flex-col gap-8 border-b col-span-1 xl:col-span-2 border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30 text-black dark:text-white">
          <div className="flex flex-row gap-2 items-center">
            <span className="text-6xl">🔥</span>
            <div className="flex flex-col">
              <p className="text-xl">
                <b>MAGAIBA</b> burnt
              </p>
              <p className="text-4xl">0</p>
            </div>
          </div>
          <p>
            For every purchase we will burn the earnings amount in MAGAIBA
            tokens.
          </p>
          <Link
            className="bg-gradient-to-r from-red-500 to-fuchsia-500 border font-bold border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            href={"/shop"}
          >
            🔥 Buy merch and burn MAGAIBA
          </Link>
        </section>
      </div>
      <br />
      <p className="text-center">
        Crafted with love by{" "}
        <a
          className="bg-gradient-to-r from-red-500 to-fuchsia-500 inline-block text-transparent bg-clip-text"
          href="https://twitter.com/ManuLpz4"
          target="_blank"
        >
          Manu Lopez
        </a>
      </p>
      <p className="text-center">
        Source code{" "}
        <a
          className="bg-gradient-to-r from-red-500 to-fuchsia-500 inline-block text-transparent bg-clip-text"
          href="https://github.com/ManuLpz4/magaiba-index"
          target="_blank"
        >
          here
        </a>
      </p>
      <br />
      <p className="text-center">
        Support Magaiba.com
        <br />
        <span className="bg-gradient-to-r from-red-500 to-fuchsia-500 inline-block text-transparent bg-clip-text">
          FVYZYrzbCo9Y4mosx9VJeUSUaUW1xJdmHbtsP8UZUSZo
        </span>
      </p>
    </main>
  );
}