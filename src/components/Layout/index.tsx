import React from "react";
import styled from "styled-components";
import BackgroundImage from "../BackgroundGrid";
import NavBar from "../NavBar";
import BottomBar from "../BottomBar";
import { baseRoutes } from "../../routing/routes";

interface SiteLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
}

const NAV_BAR_HEIGHT = '5vh';
const BOTTOM_BAR_HEIGHT = '3vh';
const PADDING_AMOUNT = '3rem'; // Assuming you want to maintain a padding of 3rem

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  box-sizing: border-box;
`;

const NavBarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  height: ${NAV_BAR_HEIGHT};
  padding: 0 ${PADDING_AMOUNT};
  background-color: /* your navbar background color here */;
`;

const MainContent = styled.div`
  flex-grow: 1;
  overflow: auto;
  max-height: calc(100vh - ${NAV_BAR_HEIGHT} - ${BOTTOM_BAR_HEIGHT} - 3 * ${PADDING_AMOUNT});
  margin: 0 ${PADDING_AMOUNT}; // Adding margin instead of padding to prevent content width issues
  display: flex;
  flex-direction: column;
  justify-content: flex-start
`;

const BottomBarContainer = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 10;
  height: ${BOTTOM_BAR_HEIGHT};
  padding-right: ${PADDING_AMOUNT};
  padding-left: ${PADDING_AMOUNT};
  padding-bottom: ${PADDING_AMOUNT};
`;

const SiteLayout: React.FC<SiteLayoutProps> = ({ children, toggleTheme }) => {
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
};

export default SiteLayout;
