import { AppBar, Box, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RouteItem } from "../../routing/RouteItem.type";
import ProfileCardContainer from "../ProfileCardContainer";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../../hooks/useTheme";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { withAnimations } from "../../hooks/animation/withAnimations";
import HomeIcon from "../HomeIcon";
import NavMenu from "../NavMenu";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { fullViewport, stickyTop } from "../../theming/util-style-functions/position";
import { flexBetween } from "../../theming/util-style-functions/layout";
import { padding } from "../../theming/util-style-functions/spacing";
import { zIndex } from "../../theming/design-tokens";

interface NavBarProps {
  links: RouteItem[];
  toggleTheme: () => void;
}


const NavBarContainer = createStyledMotionComponent('div')(props => `
  min-height: 10%;
  max-height: 10%;
  height: 10%;
  display: flex;
  flex-direction: row;
  ${flexBetween};
  ${stickyTop};
  z-index: ${zIndex.foreground + 1000}

`)



export default function NavBar({ links, toggleTheme }: NavBarProps) {

  return (
    <NavBarContainer>
      <HomeIcon title="Home" />
      <NavMenu links={links} toggleTheme={toggleTheme} />
    </NavBarContainer>
  );
}
