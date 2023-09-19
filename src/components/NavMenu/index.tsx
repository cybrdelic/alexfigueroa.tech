import React, { useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useAlternateTheme } from "../../hooks/theming/useAlternateTheme";
import HamburgerMenu from "../HamburgerMenu";
import { AnimatePresence } from "framer-motion";
import { RouteItem } from "../../routing/RouteItem.type";
import { NavLink } from "../NavLink";
import { DefaultTheme } from "styled-components/dist/models/ThemeProvider";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { relative } from "../../theming/util-style-functions/position";
import { flexBetween, flexCenter } from "../../theming/util-style-functions/layout";
import { gradientBackground, textColor } from "../../theming/util-style-functions/colors";

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
    width: 100%;
    height: 100%;
`)

const HoverItemsWrapper = createStyledMotionComponent('div')(props => `
    ${relative}
    min-width: 40%;
    max-width: 40%;
    left: 40%;

    @media (max-width: 768px) {
        left: 0;
        max-width: 100%;
        min-width: 100%;
    }
`)


const GlassEffect = `
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)),
              linear-gradient(135deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.05));
  border-radius: 10px;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(50px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.2);
`;

const GlassHoverEffect = `
  &:hover {
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.25), inset 0 2px 0 rgba(255, 255, 255, 0.7), inset 0 -2px 0 rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
`;

const AdditionalItemsContainer = createStyledMotionComponent('div')(props => `
    ${GlassEffect}
    ${GlassHoverEffect}
    ${textColor(props.theme, 'text')}
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 1rem 2rem;
    width: auto;
`);


const ParallaxEffect = `
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05) translateY(-5px);
  }
`;

const MenuContainer = createStyledMotionComponent('div')(props => `
    ${flexBetween}
    ${ParallaxEffect}
    gap: 1rem;
    width: 100%;
    max-width: 1200px;
    min-height: 105%;
`);

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

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

function NavMenu(props) {
    const altTheme = useAlternateTheme();
    const theme = useTheme();
    const [isHovered, setHovered] = React.useState(false);

    const linkHoverInAnimation = { opacity: 1, x: 0, scale: 1 };
    const linkHoverOutAnimation = { opacity: 0, x: 100, scale: 0.95 };

    const menuContainerRef = useRef();

    const handleMouseEnter = debounce(() => setHovered(true), 200);
    const handleMouseLeave = debounce(() => setHovered(false), 200);

    const hoverAnimations = {
        // Example:
        enter: { ...linkHoverInAnimation },
        leave: { ...linkHoverOutAnimation }
    };

    return (
        <MenuContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={menuContainerRef}
            menuWidth={'20rem'}
        >
            <HoverItemsContainer
                links={props.links}
                toggleTheme={props.toggleTheme}
                isHovered={isHovered}
                theme={theme}
                hoverAnimations={hoverAnimations}
                linkHoverInAnimation={linkHoverInAnimation}
                linkHoverOutAnimation={linkHoverOutAnimation}
            />
            <HamburgerMenu isHovered={isHovered} />
        </MenuContainer>
    );
}

export default React.memo(NavMenu); // Memoizing the main component
