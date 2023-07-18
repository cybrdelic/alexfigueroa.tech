import React, { useEffect, useState } from "react";
import { CursorPosType } from "../../hooks/useCursor";
import { motion } from "framer-motion";
import styled from "styled-components";

interface NegativeCursorProps {
  cursorPos: CursorPosType;
}

const Cursor = styled(motion.div)`
  position: fixed;
  pointer-events: none;
  background-color: black;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const NegativeCursor: React.FC<NegativeCursorProps> = ({ cursorPos }) => {
  const [isHovering, setIsHovering] = useState(false);

  const checkHover = () => {
    const elements = document.elementsFromPoint(cursorPos.x, cursorPos.y);
    for (const el of elements) {
      if (el.tagName.toLowerCase() === "a" || el.tagName.toLowerCase() === "button") {
        setIsHovering(true);
        return;
      }
    }
    setIsHovering(false);
  };

  useEffect(() => {
    checkHover();
  }, [cursorPos]);

  const cursorSize = isHovering ? "100px" : "50px";

  return (
    <Cursor
      style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px`, width: cursorSize, height: cursorSize }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.3 } }}
      whileHover={{ scale: 2, transition: { duration: 0.3 } }}
      exit={{ scale: 0, opacity: 0 }}
    />
  );
};

export default NegativeCursor;
