import { useEffect, useState } from "react";

export const useGentlenessIndex = () => {
  const [gentlenessValue, setGentlenessValue] = useState(0);

  function calculateFearAndGreedIndex(pairInfo: any): number {
    const { priceChange, volume, liquidity } = pairInfo.pair;
    const alpha = 0.4;
    const beta = 0.3;
    const gamma = 0.3;
    const normalizedPriceChange =
      (priceChange.m5 + priceChange.h1 + priceChange.h6 + priceChange.h24) /
      4 /
      100;
    const normalizedVolume =
      Math.max(volume.m5, volume.h1, volume.h6, volume.h24) / volume.h24;
    const normalizedLiquidity = liquidity.usd / 1000000;
    const fearAndGreedIndex =
      alpha * normalizedPriceChange +
      beta * normalizedVolume +
      gamma * normalizedLiquidity;

    return fearAndGreedIndex;
  }

  const getSentimentByValue = (value: number) => {
    if (value < 0.1) return "Evil";
    if (value < 0.2) return "Unkind";
    if (value < 0.3) return "Not that gentle";
    if (value < 0.4) return "Not that good";
    if (value < 0.5) return "MAGAIBA Neutral";
    if (value < 0.6) return "Good";
    if (value < 0.7) return "Gentle";
    if (value < 0.8) return "So good";
    if (value < 0.9) return "So gentle";
    return "Extreme gentleness";
  };

  useEffect(() => {
    const getGentlenessValue = async () => {
      const response = await fetch(
        "https://api.dexscreener.com/latest/dex/pairs/solana/5pxvyeqa7iwfuxcypuiqpdjztafnc8x5s3x3tddmptoa"
      );
      const value = await response.json();
      return calculateFearAndGreedIndex(value);
    };

    getGentlenessValue().then((index) => setGentlenessValue(index));
  }, []);

  return {
    gentlenessValue,
    sentimentValue: getSentimentByValue(gentlenessValue),
  };
};
