import React, { useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useAlternateTheme } from "../../hooks/theming/useAlternateTheme";
import HamburgerMenu from "../HamburgerMenu"; // Assuming you have this component somewhere
import { MenuContainer } from "./styles";
import { AnimatePresence } from "framer-motion";
import { RouteItem } from "../../routing/RouteItem.type";
import { AdditionalItemsContainer } from "../NavMenu/styles";
import { NavLink } from "../NavLink";
import { DefaultTheme } from "styled-components/dist/models/ThemeProvider";
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
    min-width: 40%;
    max-width: 40%;
    left: 40%;
`)
const HoverItemsContainer = ({
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


function NavMenu(props) {
    const altTheme = useAlternateTheme();
    const theme = useTheme();
    const [isHovered, setHovered] = React.useState(false);
    const linkHoverInAnimation = { opacity: 1, x: 0 };
    const linkHoverOutAnimation = { opacity: 0, x: 100 };
    const menuContainerRef = useRef();

    const hoverAnimations = {
        // Example:
        enter: { ...linkHoverInAnimation },
        leave: { ...linkHoverOutAnimation }
    };

    return (
        <MenuContainer
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={menuContainerRef}
            menuWidth={'20rem'}
        >
            <HoverItemsContainer
                links={props.links}
                toggleTheme={props.toggleTheme}
                isHovered={isHovered}
                theme={altTheme}
                hoverAnimations={hoverAnimations}
                linkHoverInAnimation={linkHoverInAnimation}
                linkHoverOutAnimation={linkHoverOutAnimation}
            />
            <HamburgerMenu isHovered={isHovered} />
        </MenuContainer>
    );
}

export default React.memo(NavMenu); // Memoizing the main component
