import React from "react";
import { IconButton } from "@mui/material";
import { DefaultTheme } from "styled-components/dist/models/ThemeProvider";
import { HamburgerBar, StyledHamburger } from "../NavMenu/styles";
import { useTheme } from "../../hooks/useTheme";

interface HamburgerMenuProps {
    isHovered: boolean;
    menuWidth: number | null;
}

export const HamburgerMenu = ({ isHovered, menuWidth }: HamburgerMenuProps) => {
    const theme = useTheme();
    const commonTransition = { type: "spring", stiffness: 2600, damping: 200 };

    const animations = isHovered ? {
        bar1: { rotate: 45, y: 8 },
        bar2: { x: menuWidth ? -menuWidth + (menuWidth * 0.325) : -2 },
        bar3: { rotate: -45, y: -8 }
    } : {
        bar1: { rotate: 0, y: 0 },
        bar2: { x: 0 },
        bar3: { rotate: 0, y: 0 }
    };

    return (
        <IconButton>
            <StyledHamburger>
                <HamburgerBar theme={theme} animate={animations.bar1} transition={commonTransition} />
                <HamburgerBar theme={theme} animate={animations.bar2} transition={commonTransition} />
                <HamburgerBar theme={theme} animate={animations.bar3} transition={commonTransition} />
            </StyledHamburger>
        </IconButton>
    );
};
