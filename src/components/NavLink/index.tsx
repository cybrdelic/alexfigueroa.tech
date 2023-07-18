import React from "react";
import { StyledNavLink } from "../NavMenu/styles";

export const NavLink = ({ theme, link, hoverAnimations }) => (
  link.name !== "Home" ? (
    <StyledNavLink theme={theme}
      to={link.path}
      whileHover={hoverAnimations.hover}
      whileTap={hoverAnimations.tap}
      className="clickable"
    >
      {link.name}
    </StyledNavLink>
  ) : null
)
