import React, { ComponentType } from "react";
import { CSSProp } from "styled-components";
import { composeStyledMotionComponents } from "./composeStyledMotionComponents";

interface StyledProps {
    theme?: any;
    'data-id'?: string;
    [key: string]: any;
}

type StyleFunction<P extends StyledProps = StyledProps> = (props: P) => CSSProp;

function toComponentName(funcName: string): string {
    return funcName.replace('Styles', '').replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
}

function createStyledComponents<T extends keyof JSX.IntrinsicElements | ComponentType<any>>(
    component: T,
    stylesFuncs: StyleFunction[]
) {
    const styledComponents: { [key: string]: any } = {};

    stylesFuncs.forEach((styleFunc) => {
        const funcName = styleFunc.name;
        const componentName = toComponentName(funcName);
        styledComponents[componentName] = composeStyledMotionComponents(component, styleFunc);
    });

    return styledComponents;
}
