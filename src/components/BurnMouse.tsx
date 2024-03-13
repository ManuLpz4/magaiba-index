import { useEffect, useState } from "react";

export const BurnMouse = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: any) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    window.addEventListener("pointermove", handleMove);

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <span
      style={{
        position: "absolute",
        pointerEvents: "none",
        left: -20,
        top: -20,
        cursor: "none",
        fontSize: 40,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      🔥
    </span>
  );
};
