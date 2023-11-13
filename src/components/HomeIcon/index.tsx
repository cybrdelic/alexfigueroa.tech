import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowOutwardSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { fontFamily, fontSize } from "../../theming/util-style-functions/typography";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { textColor } from "../../theming/util-style-functions/colors";
import { zIndex } from "../../theming/design-tokens";

interface HomeIconProps {
  title: string;
}
const ButtonContainer = createStyledMotionComponent(Link)(props => `
  display: flex;
  align-items: flex-end;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  z-index: ${zIndex.foreground + 100};
  &:hover {
    transform: scale(1.05);
  }
`);

const StyledText = createStyledMotionComponent('h2')(props => `
  font-weight: 700;
  letter-spacing: 0.8px;
  ${textColor(props.theme, 'text')}
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  ${fontSize('h6')}
  margin: 0;  // Reset default margin
  align-self: flex-end;  // Push to the bottom
  ${fontFamily('Nova Square')}
`);

const StyledIconContainer = createStyledMotionComponent('div')(props => `
  display: inline-flex;
  ${fontSize('h4')}
  ${textColor(props.theme, 'text')}
  transition: all 0.3s ease-in-out;
  transform: rotate(270deg);
  height: 100%;
  align-self: flex-end;  // Push to the bottom
`);

// ... rest of the component remains unchanged


function HomeIcon({ title }: HomeIconProps) {
  const theme = useTheme();

  return (
    <ButtonContainer to="/" role="button">
      <StyledIconContainer theme={theme}>
        <ArrowOutwardSharp fontSize="inherit" />
      </StyledIconContainer>
      <StyledText theme={theme}>{title}</StyledText>
    </ButtonContainer>
  );
}

export default HomeIcon;
