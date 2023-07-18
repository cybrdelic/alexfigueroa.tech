import React from "react";
import { IconButton } from "@mui/material";
import { DefaultTheme } from "styled-components/dist/models/ThemeProvider";
import { HamburgerBar, StyledHamburger } from "../NavMenu/styles";

interface HamburgerMenuProps {
    theme: DefaultTheme;
    isHovered: boolean;
}

export const HamburgerMenu = ({ theme, isHovered }: HamburgerMenuProps) => {
    return (
        <IconButton>
            <StyledHamburger>
                <HamburgerBar theme={theme}
                    animate={isHovered ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }} />
                <HamburgerBar theme={theme}
                    animate={isHovered ? { x: -1050 } : { x: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }} />
                <HamburgerBar theme={theme}
                    animate={isHovered ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }} />
            </StyledHamburger>
        </IconButton>
    );
};
