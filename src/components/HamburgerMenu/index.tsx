import React, { FC } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useTheme } from "../../hooks/useTheme";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { projectsData } from "../../data/project.data";
import {
    backgroundColor,
    gradientBackground,
    neonizedTextColor,
    textColor,
} from "../../theming/util-style-functions/colors";
import {
    flexCenter,
    flexBetween,
    flexColumn,
} from "../../theming/util-style-functions/layout";
import { padding } from "../../theming/util-style-functions/spacing";
import { Bar, HamburgerContainer } from "../NavMenu/styles";

// Hamburger Menu Component
export default function HamburgerMenu({ isHovered }: HamburgerMenuProps) {
    const theme = useTheme();
    const commonTransition = { type: "spring", stiffness: 2600, damping: 200 };

    const animations = isHovered
        ? {
            bar1: { rotate: 45, y: 10 },
            bar2: { opacity: 0 },
            bar3: { rotate: -45, y: -10 },
        }
        : {
            bar1: { rotate: 0, y: 0 },
            bar2: { opacity: 1 },
            bar3: { rotate: 0, y: 0 },
        };

    return (
        <HamburgerContainer>
            {["bar1", "bar2", "bar3"].map((bar, index) => (
                <Bar
                    key={index}
                    theme={theme}
                    animate={animations[bar]}
                    transition={commonTransition}
                />
            ))}
        </HamburgerContainer>
    );
};



interface HamburgerMenuProps {
    isHovered: boolean;
}
