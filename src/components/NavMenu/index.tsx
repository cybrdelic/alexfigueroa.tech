import React from "react";
import { RouteItem } from "../../routing/RouteItem.type";
import { useTheme } from "../../hooks/useTheme";
import { useHoverAnimations } from "../../hooks/animation/useHoverAnimations";
import { MenuContainer } from "./styles";
import { HoverItemsContainer } from "../HoverItemsContainer";
import { HamburgerMenu } from "../HamburgerMenu";
import { useAlternateTheme } from "../../hooks/theming/useAlternateTheme";
import useElementWidth from "../../hooks/useElementWidth";

interface NavMenuProps {
    links: RouteItem[];
    toggleTheme: () => void;
}

export default function NavMenu(props: NavMenuProps) {
    const altTheme = useAlternateTheme();
    const theme = useTheme()
    const { isHovered, setHovered, hoverAnimations } = useHoverAnimations();
    const [menuWidth, menuRef] = useElementWidth(isHovered);



    const linkHoverInAnimation = { opacity: 1, x: 0 };
    const linkHoverOutAnimation = { opacity: 0, x: 100 };

    return (
        <MenuContainer
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={menuRef}
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
            <HamburgerMenu
                isHovered={isHovered}
                menuWidth={menuWidth}
            />

        </MenuContainer>
    )
}
