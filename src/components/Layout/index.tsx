import React from "react";
import BackgroundImage from "../BackgroundImage";
import NavBar from "../NavBar";
import { baseRoutes } from "../../routing/routes";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { padding } from "../../theming/util-style-functions/spacing";
import { mq } from "../../theming/util-style-functions/responsive";

interface SiteLayoutProps {
    children: React.ReactNode[] | React.ReactNode,
    toggleTheme: () => void
}

const MainContent = createStyledMotionComponent('div')(props => `
  ${padding('md')}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mq('md')} {
    ${padding('lg')}
  }
`);
export default function SiteLayout({ children, toggleTheme }: SiteLayoutProps) {
    return (
        <BackgroundImage>
            <NavBar links={baseRoutes} toggleTheme={toggleTheme} />
            <MainContent>
                {children}
            </MainContent>
        </BackgroundImage>
    );

}
