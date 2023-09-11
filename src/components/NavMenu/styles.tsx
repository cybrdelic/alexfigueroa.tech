import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { backgroundColor, gradientBackground, neonizedTextColor, textColor } from "../../theming/util-style-functions/colors";
import { flexBetween, flexCenter, flexColumn } from "../../theming/util-style-functions/layout";
import { padding } from "../../theming/util-style-functions/spacing";
import { projectsData } from "../../data/project.data";

export const HamburgerBar = createStyledMotionComponent('div')(props => `
    width: 2.5rem;
    height: 0.3rem;
    ${backgroundColor(props.theme, 'text')}
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
    ${gradientBackground(props.theme, 'background')}
    border-radius: 100px;
`);

export const MenuContainer = createStyledMotionComponent('div')(props => `
    ${flexBetween}
    min-width: 80%;
`);

export const StyledNavLink = styled(motion(Link))(({ theme }) => `
    font-family: ${projectsData.x1dra.titleFont}, sans-serif;
    ${textColor(theme, 'text')}
    text-decoration: none;
    ${padding('md')}
    ${flexColumn}
    font-weight: 900;
`);
