"use client";

import ReactSpeedometer from "react-d3-speedometer";

import { useGentlenessIndex } from "@magaiba-index/hooks/useGentleIndex";
import { useMagaibaRadio } from "@magaiba-index/hooks/useMagaibaRadio";
import { useEffect, useState } from "react";

export default function App() {
  const { isPlaying, toggleMagaibaRadio, increaseVolume, decreaseVolume, volume } = useMagaibaRadio();
  const { gentlenessValue, sentimentValue } = useGentlenessIndex();
  const [dancingValue, setDancingValue] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      setInterval(() => {
        setDancingValue(gentlenessValue * (1 + Math.random() * 0.05));
      }, 500);
    } else {
      setDancingValue(0);
    }
  }, [isPlaying, gentlenessValue]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <section className="flex flex-col gap-10 justify-center items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit  rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
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
          segments={1_000}
          maxSegmentLabels={0}
          needleColor="white"
          needleTransitionDuration={1_000}
          value={(dancingValue || gentlenessValue) * 1_000}
          startColor="red"
          endColor="fuchsia"
        />
        <div className="flex justify-center items-center gap-4">
          <div
            className="flex items-center text-center text-3xl"
            onClick={toggleMagaibaRadio}
          >
            {isPlaying ? "⏸︎" : "▶️"}
          </div>
          <div className="flex items-center justify-right">
            <button onClick={decreaseVolume} disabled={volume <= 0}>-</button>
            {volume === 0 ? "🔈" : volume < 0.5 ? "🔉" : "🔊"}

            <button onClick={increaseVolume} disabled={volume >= 1}>+</button>
          </div>
        </div>
      </section>
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
    </main>
  );
}
