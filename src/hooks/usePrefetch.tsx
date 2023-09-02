import { useEffect, useState, useRef } from 'react';

export const usePrefetch = (links: string[]) => {
    const [targets, setTargets] = useState<Element[]>([]);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const fetchContent = (link: string) => {
            fetch(link) // replace with your function to prefetch data
                .then((response) => response.json())
                .then((data) => console.log(`Prefetched: ${data}`));
        };

        if ('IntersectionObserver' in window) {
            observer.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const linkElement = entry.target as HTMLLinkElement;
                            const link = linkElement.getAttribute('to');
                            if (link) {
                                const linkToPrefetch = link.startsWith('/') ? link.slice(1) : link;
                                if (links.includes(linkToPrefetch)) {
                                    fetchContent(linkToPrefetch);
                                }
                            }
                        }
                    });
                },
                { rootMargin: '0px 0px 100px 0px' },
            );

            targets.forEach((target) => observer.current?.observe(target));
        }
        return () => {
            targets.forEach((target) => observer.current?.unobserve(target));
            observer.current?.disconnect();
        };
    }, [links, targets]);

    return { setTargets };
};

export default usePrefetch;
