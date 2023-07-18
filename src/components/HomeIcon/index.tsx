import React from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import {ReactComponent as Logo} from './logo.svg'
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { withAnimations } from "../../hooks/animation/withAnimations";
import { useTheme } from "../../hooks/useTheme";

interface HomeIconProps {
    title: string
}

const StyledLogo = styled(motion(Logo))`
  width: 80px;
  height: 80px;
  display: flex; // added
  justify-content: center; // added
  align-items: center;
`;

const StyledLogoText = styled(motion.h2)(({theme}) => `
  font-family: 'Orbitron';
  font-size: 2rem;
  height: 80px;
  display: flex; // added
  justify-content: center; // added
  align-items: center;
  color: ${theme.text}
`);

const StyledIconButton = styled(motion(IconButton))(({theme}) => `
  display: flex;
  flex-direction: row;
  grid-gap: 0rem;
  align-items: center;
  border-radius: 0px;
`);

function HomeIcon(props: HomeIconProps) {
    const theme = useTheme()
    const hoverEffect = {
        scale: 1.2,
    };

    const tapEffect = {
        scale: 0.9
    };
    
    return (
        <Link to="/">
            <StyledIconButton 
                whileHover={hoverEffect} 
                whileTap={tapEffect}
                color="inherit" 
                aria-label="home"
            >
              <StyledLogo/>
              <StyledLogoText>
                {props.title}
              </StyledLogoText>
            </StyledIconButton>
        </Link>
    )
}

export default (HomeIcon)
