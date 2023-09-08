import { useState } from 'react';

const getAnimationProps = (status) => {
    const unifiedTransition = {
        duration: 0.5,
        ease: [0.9, 0.67, 0.53, 0.99] // your chosen bezier curve
    };

    switch (status) {
        case 'active':
            return {
                initial: {
                    transform: "translateX(0%) scale(10, 0.6) rotateY(0deg)",  // Exaggerated stretch in the Y direction
                    opacity: 0.5,
                    filter: 'blur(10px) brightness(0.8)',
                },
                animate: {
                    transform: "translateX(0%) scale(1.05, 1) rotateY(0deg)",
                    filter: 'blur(0px) brightness(1.2)',
                    opacity: 1
                },
                exit: {
                    transform: "translateX(-200%) scale(0.9, 0.8) rotateY(15deg)", // Compressed in the Y direction
                    opacity: 0.3,
                    filter: 'blur(5px) brightness(0.8)'
                },
                transition: unifiedTransition
            };
        case 'previous':
            return {
                initial: {
                    transform: "translateX(-300%) scale(0.4, 0.45) rotateY(-60deg)", // Slightly stretch in the Y direction
                    opacity: 0.3,
                },
                animate: {
                    transform: "translateX(-300%) scale(5, 0.55) rotateY(-45deg)", // Slightly stretch in the Y direction
                    filter: 'blur(20px) brightness(0.7)',
                    opacity: 1
                },
                exit: {
                    transform: "translateX(-300%) scale(0.3, 0.35) rotateY(-60deg)", // Slightly stretch in the Y direction
                    filter: 'blur(30px) brightness(0.6)',
                    opacity: 0
                },
                transition: unifiedTransition
            };

        case 'next':
            return {
                initial: {
                    transform: "translateX(60%) scale(10, 9.5) rotateY(45deg)", // Slightly squeeze in the Y direction
                    opacity: 0,
                    filter: 'blur(30px) brightness(0.6)',
                },
                animate: {
                    transform: "translateX(60%) scale(0.8, 0.8) rotateY(45deg)", // Slightly squeeze in the Y direction
                    zIndex: 0,
                    filter: 'blur(20px) brightness(0.7)',
                    opacity: 0.6
                },
                exit: {
                    transform: "translateX(60%) scale(0.8, 0.7) rotateY(60deg)", // Slightly squeeze in the Y direction
                    filter: 'blur(30px) brightness(0.6)',
                    opacity: 0
                },
                transition: unifiedTransition
            };

        default:
            return {};
    }
};



const useCarouselLayoutAnimation = (items) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const getPreviousIndex = () => (activeIndex - 1 + items.length) % items.length;
    const getNextIndex = () => (activeIndex + 1) % items.length;

    const getPropsForStatus = (status) => {
        switch (status) {
            case 'previous': return getAnimationProps('previous');
            case 'active': return getAnimationProps('active');
            case 'next': return getAnimationProps('next');
            default: return {};
        }
    };

    return {
        next,
        activeIndex,
        getPreviousIndex,
        getNextIndex,
        getPropsForStatus
    };
};

export default useCarouselLayoutAnimation;
