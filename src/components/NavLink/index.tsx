import React from "react";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { create } from "lodash";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { fontFamily } from "../../theming/util-style-functions/typography";
import { neonizedTextColor, textColor } from "../../theming/util-style-functions/colors";
import { padding } from "../../theming/util-style-functions/spacing";
import { flexColumn } from "../../theming/util-style-functions/layout";

const StyledNavLink = createStyledMotionComponent('a')(props => `
  ${fontFamily()}
  ${textColor(props.theme, 'text')}
  text-decoration: none;
  ${padding('md')}
  ${flexColumn}
  font-weight: 900;
  transition: color 0.3s ease, transform 0.3s ease;
    &:hover {
      color: ${neonizedTextColor(props.theme, 'primary')};
      transform: scale(1.05);
  }
`);

export const NavLink = ({ theme, link, hoverAnimations }) => {
  const cursorData = useCursorEffect();

  return (
    link.name !== "Home" ? (
      <StyledNavLink theme={theme}
        to={link.path}
        whileHover={hoverAnimations.hover}
        whileTap={hoverAnimations.tap}
        className="clickable"
        data-id="special"
      >
        {link.name}
      </StyledNavLink>
    ) : null
  )

}
