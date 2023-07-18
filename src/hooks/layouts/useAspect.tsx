import { useState, useLayoutEffect, useRef } from 'react';

const useAspect = (width: number, height: number) => {
    const ref = useRef<HTMLElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        function handleResize() {
            if (ref.current) {
                const { offsetWidth } = ref.current;
                setDimensions({ width: offsetWidth, height: offsetWidth * (height / width) });
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [ref, width, height]);

    return [ref, dimensions];
};
