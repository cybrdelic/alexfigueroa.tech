import React from "react";
import { AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle";
import { RouteItem } from "../../routing/RouteItem.type";
import { AdditionalItemsContainer } from "../NavMenu/styles";
import { NavLink } from "../NavLink";
import { DefaultTheme } from "styled-components/dist/models/ThemeProvider";

interface HoverItemsContainerProps {
    links: RouteItem[];
    toggleTheme: () => void;
    isHovered: boolean;
    theme: DefaultTheme;
    hoverAnimations: any;
    linkHoverInAnimation: any;
    linkHoverOutAnimation: any;
}

export const HoverItemsContainer = ({
    links,
    toggleTheme,
    isHovered,
    theme,
    hoverAnimations,
    linkHoverInAnimation,
    linkHoverOutAnimation
}: HoverItemsContainerProps) => (
    <div>
        <AnimatePresence>
        {isHovered && (
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <AdditionalItemsContainer
                    initial={linkHoverOutAnimation}
                    animate={linkHoverInAnimation}
                    exit={linkHoverOutAnimation}
                >
                    {links.map((link, index) =>
                        <NavLink data-id="special" key={index} link={link} theme={theme} hoverAnimations={hoverAnimations} />
                    )}
                </AdditionalItemsContainer>
            </div>
        )}
    </AnimatePresence>
    </div>
);
