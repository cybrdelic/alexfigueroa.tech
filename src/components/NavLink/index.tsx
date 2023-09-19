import React from "react";
import { StyledNavLink } from "../NavMenu/styles";
import { useCursorEffect } from "../../hooks/useCursorEffect";

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
