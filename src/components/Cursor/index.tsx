// Cursor.js
import React from 'react';
import styled from 'styled-components';

const StyledCursor = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
  transition: transform 0.1s ease-in-out;
  transform: translate(-50%, -50%) scale(1);
`;

const Cursor = ({ position }: any) => {
  return (
    <StyledCursor style={{ left: `${position.x}px`, top: `${position.y}px` }} />
  );
};

export default Cursor;
