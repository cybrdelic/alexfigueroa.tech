import { useState } from "react";
import { useAnimation } from "./useAnimation";

export const useHoverEffect = (speed = 'mediumSpeed') => {
    const [hovered, setHovered] = useState(false);

    const styles = useAnimation({
        from: { scale: 1 },
        to: hovered ? { scale: 1.1 } : { scale: 1 },
        config: { tension: 210, friction: 20 }
    });

    return [styles, setHovered];
};
