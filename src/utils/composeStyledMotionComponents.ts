import { ComponentType } from "react";
import { CSSProp } from "styled-components";
import { createStyledMotionComponent } from "./createStyledMotionComponent";

// Type definitions to make it more clear
type Component = ComponentType<any> | keyof JSX.IntrinsicElements;
type StyleFunction = (props: any) => CSSProp;

// Function to compose an arbitrary number of styled motion components
const composeStyledMotionComponents = (
    // Initial component to be styled
    initialComponent: Component,
    // Rest parameter to take multiple style functions
    ...styleFunctions: StyleFunction[]
): Component => {

    // Use the 'reduce' method to apply each style function one by one
    const ComposedComponent = styleFunctions.reduce<Component>(
        (currentComponent, nextStyleFn) => {
            // Use each style function to create a new styled component
            return createStyledMotionComponent(currentComponent)(nextStyleFn);
        },
        // Starting point for the 'reduce' method
        initialComponent
    );

    return ComposedComponent;
};
