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




