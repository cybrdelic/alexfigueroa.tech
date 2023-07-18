import { useAnimation } from "./useAnimation";

export const useFadeInEffect = (speed = 'mediumSpeed') => {
    const styles = useAnimation({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { tension: 210, friction: 20 }
    });

    return styles;
};
