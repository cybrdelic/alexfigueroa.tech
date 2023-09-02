import React, { RefObject } from 'react';

const useElementWidth = (isExpanded: boolean): [number | null, RefObject<HTMLDivElement>] => {
    const [width, setWidth] = React.useState<number | null>(null);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
        }
    }, [isExpanded]);

    return [width, ref];
};

export default useElementWidth;
