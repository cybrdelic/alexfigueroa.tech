import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { adjustTransparency } from "../../utils/adjustTransparency";
import { setBackground, setGradientBackground } from "../../theming/util-style-functions/colors";
import { flexBetween, flexCenter, flexColumn } from "../../theming/util-style-functions/layout";
import { padding } from "../../theming/util-style-functions/spacing";
import { stickyTop } from "../../theming/util-style-functions/position";

export const HamburgerBar = styled(motion.div)(({ theme }) => `
    width: 2.5rem;
    height: 0.3rem;
    ${setBackground(theme.text)}
    margin-top: 0.5rem;
`);

export const StyledHamburger = styled(motion.div)`
    display: flex;
    flex-direction: column;
`;

export const AdditionalItemsContainer = createStyledMotionComponent('div')(props => `
    ${flexCenter}
    gap: 1rem;
    width: 100%;
    justify-content: space-evenly;
    background: ${props.theme.gradient};
    border-radius: 100px;
`);

export const MenuContainer = createStyledMotionComponent('div')(props => `
    ${flexBetween}
    min-width: 80%;
`);

export const StyledNavLink = styled(motion(Link))(({ theme }) => `
    font-family: 'Orbitron', sans-serif;
    color: ${theme.text};
    text-decoration: none;
    ${padding('md')}
    ${flexColumn}
    font-weight: 900;
`);
