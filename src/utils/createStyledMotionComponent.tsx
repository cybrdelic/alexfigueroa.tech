import styled, { CSSProp } from "styled-components";
import { motion } from "framer-motion";
import React, { ComponentType, CSSProperties } from "react";

interface StyledProps {
    theme?: any;
    'data-id'?: string;
    [key: string]: any;
}

export const createStyledMotionComponent = <T extends keyof JSX.IntrinsicElements | ComponentType<any>>(
    component: T
) => {
    const isHTMLTag = (typeof component === "string");

    const MotionComponent = isHTMLTag
        ? ((motion as any)[component])
        : motion(component as ComponentType<any>);

    return <P extends StyledProps>(styles: (props: P) => CSSProp) => styled(MotionComponent).attrs(props => ({
        'data-id': props['data-id']
    }))`
        ${styles}
    `;
};
