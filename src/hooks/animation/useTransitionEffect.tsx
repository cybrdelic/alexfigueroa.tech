import { useState } from "react";
import { useAnimation } from "./useAnimation";

export const useTransitionEffect = (speed = 'mediumSpeed') => {
    const [visible, setVisible] = useState(false);

    const styles = useAnimation({
        from: { opacity: 0 },
        to: visible ? { opacity: 1 } : { opacity: 0 },
        config: { tension: 210, friction: 20 }
    });

    return [styles, setVisible];
};
