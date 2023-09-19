import React from "react";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { fontFamily } from "../../theming/util-style-functions/typography";
import { padding, margin } from "../../theming/util-style-functions/spacing";
import { flexColumn } from "../../theming/util-style-functions/layout";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { zIndex } from "../../theming/design-tokens";
import { Link } from "react-router-dom";


const getHoverColor = (mode) => mode === 'dark'
  ? "rgba(255, 255, 255, 0.6)"
  : "rgba(0, 0, 0, 0.6)";

const StyledNavLink = createStyledMotionComponent(Link)(props => `
  ${fontFamily()}
  color: ${props.theme.colors.text};
  text-decoration: none;
  ${padding('md')}
  ${margin('sm')}
  ${zIndex.foreground}
  font-weight: 900;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, text-shadow 0.2s ease;

  &:hover, &:focus {
    transform: scale(1.05);
    text-shadow: 0 0 10px ${getHoverColor(props.theme.mode)};
  }

  &:active {
    transform: scale(0.95);
  }
`);

export const NavLink = ({ theme, link, hoverAnimations }) => {
  useCursorEffect()
  if (link.name === "Home") {
    return null;
  }

  return (
    <StyledNavLink
      theme={theme}
      to={link.path}
      whileHover={hoverAnimations.hover}
      whileTap={hoverAnimations.tap}
      className="clickable"
      data-id="special"
    >
      {link.name}
    </StyledNavLink>
  );
}
