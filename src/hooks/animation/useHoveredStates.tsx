import { useState } from 'react';

export const useHoveredState = () => {
    const [isHovered, setIsHovered] = useState(false);
    const onHoverStart = () => setIsHovered(true);
    const onHoverEnd = () => setIsHovered(false);

    return { isHovered, onHoverStart, onHoverEnd };
};
