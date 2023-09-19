import React, { useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useAlternateTheme } from "../../hooks/theming/useAlternateTheme";
import HamburgerMenu from "../HamburgerMenu"; // Assuming you have this component somewhere
import { MenuContainer } from "./styles";
import { HoverItemsContainer } from "../HoverItemsContainer";

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
