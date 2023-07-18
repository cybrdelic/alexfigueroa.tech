import { useState, useRef, useLayoutEffect } from 'react';

const useMeasure = () => {
    const ref = useRef<HTMLElement | null>(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, width: 0, height: 0 });

    useLayoutEffect(() => {
        if (ref.current) {
            setBounds(ref.current.getBoundingClientRect());
        }
    }, [ref.current]);

    return [ref, bounds];
};
