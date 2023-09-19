import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { backgroundColor, gradientBackground, neonizedTextColor, textColor } from "../../theming/util-style-functions/colors";
import { flexBetween, flexCenter, flexColumn } from "../../theming/util-style-functions/layout";
import { padding } from "../../theming/util-style-functions/spacing";
import { projectsData } from "../../data/project.data";

export const HamburgerContainer = createStyledMotionComponent('div')(props =>
  `
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${props.theme.primary};
    `
);

export const Bar = createStyledMotionComponent('div')(props => `
width: 2.5rem;
height: 0.3rem;
  ${backgroundColor(props.theme, 'text')}
margin: 0.5rem 0;
transition: background - color 0.2s ease;
  &:hover {
    background - color: ${textColor(props.theme, 'text')};
}
`);

export const AdditionalItemsContainer = createStyledMotionComponent('div')(props => `
  ${flexCenter}
gap: 1rem;
background - color: ${props.theme.secondary};
  ${gradientBackground(props.theme, 'background')}
border - radius: 100px;
padding: 1rem 2rem;
`);

export const MenuContainer = createStyledMotionComponent('div')(props => `
    ${flexBetween}
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    min-height: 105%;
`);

export const StyledNavLink = styled(motion(Link))(({ theme }) => `
font - family: ${projectsData.x1dra.titleFont}, sans - serif;
  ${textColor(theme, 'text')}
text - decoration: none;
  ${padding('md')}
  ${flexColumn}
font - weight: 900;
transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: ${neonizedTextColor(theme, 'primary')};
    transform: scale(1.05);
}
`);
