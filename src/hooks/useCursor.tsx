import { useState, useEffect } from "react";

export type CursorPosType = {
  x: number;
  y: number;
};

const useCursor = (): CursorPosType => {
  const [cursorPos, setCursorPos] = useState<CursorPosType>({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPos = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPos);

    return () => {
      window.removeEventListener("mousemove", updateCursorPos);
    };
  }, []);

  return cursorPos;
};

export default useCursor;
