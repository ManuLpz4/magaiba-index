
import { useEffect, useState, useRef } from "react";

export const useMagaibaRadio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio("/music/magaiba.mp3"));

  const toggleMagaibaRadio = () => {
    setIsPlaying(!isPlaying);
  };

  const increaseVolume = () => {
    if (volume < 1) {
      setVolume(Math.min(volume + 0.1, 1));
      audioRef.current.volume = Math.min(volume + 0.1, 1); 
    }
  };

  const decreaseVolume = () => {
    if (volume > 0) {
      setVolume(Math.max(volume - 0.1, 0));
      audioRef.current.volume = Math.max(volume - 0.1, 0);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying]);

  return { isPlaying, toggleMagaibaRadio, increaseVolume, decreaseVolume, volume };
};
