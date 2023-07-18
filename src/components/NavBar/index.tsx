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

interface NavBarProps {
  links: RouteItem[];
  toggleTheme: () => void;
}

const NavBarWrapper = styled(Box)`
  height: 80px;
`



function NavBar({ links, toggleTheme }: NavBarProps) {
  const theme = useTheme();
  const [isHovered, setHovered] = useState(false);

  const hoverAnimations = {
    hover: { scale: 1.2 },
    tap: { scale: 0.95 },
  };


  const linkHoverInAnimation = { opacity: 1, x: 0 };
  const linkHoverOutAnimation = { opacity: 0, x: 100 };

  const profileCardHoverInAnimation = { opacity: 1, y: 0 };
  const profileCardHoverOutAnimation = { opacity: 0, y: 100 };

  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <NavBarWrapper display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" padding="1rem">
        <HomeIcon title="Alex Figueroa" />
        <NavMenu links={links} toggleTheme={toggleTheme} />
      </NavBarWrapper>
    </AppBar>
  );
}

export default withAnimations("slideIn")(NavBar);
