import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RouteItem } from '../../routing/RouteItem.type';

interface NavBarProps {
  links: RouteItem[]
  theme: string,
  toggleTheme: () => void
}

// Define your styled components
const Nav = styled.nav`
  background: ${props => props.theme.background};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const NavLink = styled(motion(Link))`
  color: ${props => props.theme.text};
  text-decoration: none;
  margin-right: 1rem;

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const AdditionalItemsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const ProfileCardContainer = styled(motion.div)`
  position: absolute;
  bottom: -10px;
`;

const ThemeToggleButton = styled.button`
  color: ${props => props.theme.text};
  background: ${props => props.theme.background};
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;


// Modify the NavBar function to destructure the new props
export default function NavBar({ links, theme, toggleTheme }: NavBarProps) {
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
    <Nav onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <NavLink
        to="/"
        whileHover={hoverAnimations.hover}
        whileTap={hoverAnimations.tap}
      >
        Home
      </NavLink>

      <AnimatePresence>
        {isHovered && (
          <AdditionalItemsContainer
            initial={linkHoverOutAnimation}
            animate={linkHoverInAnimation}
            exit={linkHoverOutAnimation}
          >
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                whileHover={hoverAnimations.hover}
                whileTap={hoverAnimations.tap}
              >
                {link.name}
              </NavLink>
            ))}
            {/* Include the theme toggle button */}
            <ThemeToggleButton onClick={toggleTheme}>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </ThemeToggleButton>
          </AdditionalItemsContainer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHovered && (
          <ProfileCardContainer
            initial={profileCardHoverOutAnimation}
            animate={profileCardHoverInAnimation}
            exit={profileCardHoverOutAnimation}
          >
            <div>profile</div>
          </ProfileCardContainer>
        )}
      </AnimatePresence>
    </Nav>
  );
}

