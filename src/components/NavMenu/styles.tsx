import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { createStyledMotionComponent } from "../../utils/createStyledMotionComponent";
import { adjustTransparency } from "../../utils/adjustTransparency";

export const HamburgerBar = styled(motion.div)(({ theme }) => `
    width: 2.5rem;
    height: 0.3rem;
    background: ${theme.text};
    margin-top: 0.5rem;
`);

export const StyledHamburger = styled(motion.div)`
    display: flex;
    flex-direction: column;
`;

export const AdditionalItemsContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    min-width: 80rem;
    justify-content: space-evenly;
    background: ${props.theme.gradient};
    border-radius: 100px;
    padding: 0rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`);

export const MenuContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 70%;
    justify-content: space-between;
`;

export const StyledNavLink = styled(motion(Link))(({ theme }) => `
    font-family: 'Orbitron', sans-serif;
    color: ${theme.text};
    text-decoration: none;
    padding: 1rem;
    display: flex;
    flex-direction: columns;
    justify-content: center;
    align-items: center;
    font-weight: 900;
`);
