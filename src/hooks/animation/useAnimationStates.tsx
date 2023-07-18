import { Variants } from "framer-motion";

interface UseAnimationStatesArgs {
    hover?: Variants;
    pressed?: Variants;
    tap?: Variants;
    initial?: Variants;
    animate?: Variants;
    exit?: Variants;
}

export function useAnimationStates({ hover, pressed, tap, initial, animate, exit }: UseAnimationStatesArgs) {
    return { whileHover: hover, whileTap: tap, initial, animate, exit };
}
