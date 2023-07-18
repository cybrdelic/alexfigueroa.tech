import { useSpring, to } from 'react-spring';

export const useAnimation = ({ from, to, config }) => {
    const styles = useSpring({ from, to, config });

    return styles;
};
