import { useState, useEffect } from 'react';

const useResponsive = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1024);
            setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { isDesktop, isTablet, isMobile };
};
