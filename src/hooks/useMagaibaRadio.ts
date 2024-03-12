import { useEffect, useState } from "react";

export const useMagaibaRadio = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMagaibaRadio = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = new Audio("/music/magaiba.mp3");

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying]);

  return { isPlaying, toggleMagaibaRadio };
};
