import React from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as Logo } from './logo.svg';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { flexCenter } from "../../theming/util-style-functions/layout";
import { mq } from "../../theming/util-style-functions/responsive";

const centeredContent = `
  ${flexCenter}
`;

interface HomeIconProps {
  title: string;
}

const StyledLogo = styled(motion(Logo))`
  width: 20px;
  height: 20px;
  ${centeredContent}

  ${mq('sm')} {
    width: 15px;
    height: 15px;
  }

  ${mq('md')} {
    width: 18px;
    height: 18px;
  }

  ${mq('lg')} {
    width: 20px;
    height: 20px;
  }
`;

const StyledLogoText = styled(motion.h2)(({ theme }) => `
  font-family: 'Orbitron';
  ${centeredContent}
  color: ${theme.text}

  ${mq('sm')} {
    font-size: 1.5rem;
  }

  ${mq('md')} {
    font-size: 1.8rem;
  }

  ${mq('lg')} {
    font-size: 2rem;
  }
`);

const StyledIconButton = styled(motion(IconButton))`
  ${flexCenter}
  flex-direction: row;
  grid-gap: 0.5rem; // Added a gap for clarity on smaller devices
  border-radius: 0px;

  ${mq('sm')} {
    grid-gap: 0.3rem;
  }
`;

function HomeIcon(props: HomeIconProps) {
  const theme = useTheme();
  const hoverEffect = {
    scale: 1.2,
  };

  const tapEffect = {
    scale: 0.9
  };

  return (
    <Link to="/" role="button">
      <StyledIconButton
        whileHover={hoverEffect}
        whileTap={tapEffect}
        color="inherit"
        aria-label="home"
      >
        <StyledLogo />
        <StyledLogoText theme={theme}>
          {props.title}
        </StyledLogoText>
      </StyledIconButton>
    </Link>
  );
}

export default HomeIcon;
