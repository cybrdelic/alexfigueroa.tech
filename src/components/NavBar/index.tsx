import { AppBar, Box, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link} from "react-router-dom";
import { RouteItem } from "../../routing/RouteItem.type";
import ProfileCardContainer from "../ProfileCardContainer";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../../hooks/useTheme";
import HomeIcon from '@mui/icons-material/Home';
import { styled } from "styled-components";
import NavLink from "../NavLink";
import { withAnimations } from "../../hooks/animation/withAnimations";


interface NavBarProps {
  links: RouteItem[]
  toggleTheme: () => void
}
const AdditionalItemsContainer = styled(motion.div)`
  // Add your styles here
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  gap: 1rem;
`;


function NavBar({ links, toggleTheme }: NavBarProps) {
  const theme = useTheme()
  const [isHovered, setHovered] = useState(false);

  const hoverAnimations = {
    hover: { scale: 1.2 },
    tap: { scale: 0.95 },
  };


  const linkHoverInAnimation = { opacity: 1, x: 0 };
  const linkHoverOutAnimation = { opacity: 0, x: -100 };

  const profileCardHoverInAnimation = { opacity: 1, y: 0 };
  const profileCardHoverOutAnimation = { opacity: 0, y: 100 };
  
  return (
    <AppBar position="fixed" color="transparent" elevation={0} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
     <Box display="flex" justifyContent="space-between" alignItems="center" padding="1rem">
        <motion.div whileHover={hoverAnimations.hover} whileTap={hoverAnimations.tap}>
          <IconButton component={Link} to="/" color="inherit" aria-label="home">
            <HomeIcon />
          </IconButton>
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <AdditionalItemsContainer
              initial={linkHoverOutAnimation}
              animate={linkHoverInAnimation}
              exit={linkHoverOutAnimation}
            >
              {links.map((link, index) => link.name !== 'Home' && (
                <NavLink
                  key={index}
                  to={link.path}
                  whileHover={hoverAnimations.hover}
                  whileTap={hoverAnimations.tap}
                  className="clickable"
                >
                  {link.name}
                </NavLink>
              ))}
              <ThemeToggle onClick={toggleTheme}/>
            </AdditionalItemsContainer>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isHovered && (
            <ProfileCardContainer
              initial={profileCardHoverOutAnimation}
              animate={profileCardHoverInAnimation}
              exit={profileCardHoverOutAnimation}
              theme={theme}
            >
              <div>profile</div>
            </ProfileCardContainer>
          )}
        </AnimatePresence>
      </Box>
    </AppBar>
  );
}

export default withAnimations('slideIn')(NavBar);