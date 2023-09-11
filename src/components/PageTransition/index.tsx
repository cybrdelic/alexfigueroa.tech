import { motion } from "framer-motion";
import { zIndex } from "../../theming/design-tokens/spacing";
const animationConfiguration = {
    initial: { x: -100 },
    animate: { x: 0 },
    exit: { x: 100 },  // Jolt upwards then move to the right
};
const PageTransition = ({ children }) => {
    return (
        <motion.div
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
            style={{ zIndex: zIndex.foreground }}
        >
            {children}
        </motion.div>
    );
};
export default PageTransition;
