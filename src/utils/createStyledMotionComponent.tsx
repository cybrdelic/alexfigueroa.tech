import styled, { CSSProp } from "styled-components";
import { motion } from "framer-motion";
import React, { ComponentType } from "react";

export const createStyledMotionComponent = <T extends keyof JSX.IntrinsicElements | ComponentType<any>>(
    component: T
) => {
    // Check if it's a HTML tag or a React component
    const isHTMLTag = (typeof component === "string");

    const MotionComponent = isHTMLTag
        ? ((motion as any)[component])
        : motion(component as ComponentType<any>);

    return (styles: CSSProp) => styled(MotionComponent)`
    ${styles}
  `;
};
