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
import { setBackground } from "../../theming/util-style-functions/colors";

interface NavBarProps {
  links: RouteItem[];
  toggleTheme: () => void;
}

const NavBarWrapper = styled(Box)`
  height: 80px;
`

const NavBarContainer = createStyledMotionComponent('div')(props => `
  ${stickyTop}
  ${setBackground('green')}
`)



function NavBar({ links, toggleTheme }: NavBarProps) {

  return (
    <NavBarContainer>
      <NavBarWrapper display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" padding="1rem">
        <HomeIcon title="Alex Figueroa" />
        <NavMenu links={links} toggleTheme={toggleTheme} />
      </NavBarWrapper>
    </NavBarContainer>
  );
}

export default withAnimations("slideIn")(NavBar);
