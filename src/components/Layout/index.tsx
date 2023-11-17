import React, { useEffect } from "react";
import BackgroundImage from "../BackgroundGrid";
import NavBar from "../NavBar";
import BottomBar from "../BottomBar";
import { baseRoutes } from "../../routing/routes";
import styled from "styled-components";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { useNavigate } from "react-router-dom";
import { padding } from "../../theming/util-style-functions/spacing";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";

interface SiteLayoutProps {
    children: React.ReactNode[] | React.ReactNode;
    toggleTheme: () => void;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure it covers the full viewport height
  box-sizing: border-box; // Include padding in the height calculation
`;

const MainContent = styled.div`
  flex-grow: 1;
  overflow: auto; // Allow scrolling if content overflows
  min-height: 80vh;
  padding-left: 3rem;
  padding-right:  3rem;
`;



const NavBarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10; // Ensure it's above the MainContent
  // Rest of your NavBar styles
  height: 10vh;
  ${padding('xxl')}
`;

const BottomBarContainer = styled.div`
  position: sticky;
  bottom: 0;
  height: 10vh;
  z-index: 10; // Ensure it's above the MainContent
  // Rest of your BottomBar styles
  ${padding('xxl')}
`;

export default function SiteLayout({ children, toggleTheme }: SiteLayoutProps) {
    // Rest of your component logic
    return (
        <BackgroundImage>
            <LayoutContainer>
                <NavBarContainer>
                    <NavBar links={baseRoutes} toggleTheme={toggleTheme} />
                </NavBarContainer>
                <MainContent>{children}</MainContent>
                <BottomBarContainer>
                    <BottomBar toggleTheme={toggleTheme} />
                </BottomBarContainer>
            </LayoutContainer>
        </BackgroundImage>
    );
}
