import { useState, useEffect } from 'react';

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(window.scrollY);

    useEffect(() => {
        function handleScroll() {
            setScrollPosition(window.scrollY);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
};
