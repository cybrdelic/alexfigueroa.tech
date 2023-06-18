// NavLink.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavLink = styled(motion(Link))`
  color: ${props => props.theme.text};
  text-decoration: none;
  margin-right: 1rem;
  font-family: 'Orbitron';

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

export default NavLink;