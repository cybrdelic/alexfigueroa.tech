import React from "react";
import { AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle";
import { RouteItem } from "../../routing/RouteItem.type";
import { AdditionalItemsContainer } from "../NavMenu/styles";
import { NavLink } from "../NavLink";
import { DefaultTheme } from "styled-components/dist/models/ThemeProvider";
import useElementWidth from "../../hooks/useElementWidth";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { relative } from "../../theming/util-style-functions/position";

interface HoverItemsContainerProps {
    links: RouteItem[];
    toggleTheme: () => void;
    isHovered: boolean;
    theme: DefaultTheme;
    hoverAnimations: any;
    linkHoverInAnimation: any;
    linkHoverOutAnimation: any;
}

const Wrapper = createStyledMotionComponent('div')(props => `
    ${relative}
`)

const HoverItemsWrapper = createStyledMotionComponent('div')(props => `
    ${relative}
    min-width: 50%;
    left: 40%;
`)
export const HoverItemsContainer = ({
    links,
    toggleTheme,
    isHovered,
    theme,
    hoverAnimations,
    linkHoverInAnimation,
    linkHoverOutAnimation,
}: HoverItemsContainerProps) => {
    return (
        <HoverItemsWrapper>
            <AnimatePresence>
                {isHovered && (
                    <Wrapper>
                        <AdditionalItemsContainer
                            initial={linkHoverOutAnimation}
                            animate={linkHoverInAnimation}
                            exit={linkHoverOutAnimation}
                            theme={theme}
                        >
                            {links.map((link, index) =>
                                <NavLink data-id="special" key={index} link={link} theme={theme} hoverAnimations={hoverAnimations} />
                            )}
                        </AdditionalItemsContainer>
                    </Wrapper>
                )}
            </AnimatePresence>
        </HoverItemsWrapper>
    )
};
