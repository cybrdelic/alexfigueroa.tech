import { motion } from "framer-motion";
import { zIndex } from "../../theming/design-tokens/spacing";
const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
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
