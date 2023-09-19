import React from "react";
import BackgroundImage from "../BackgroundGrid";
import NavBar from "../NavBar";
import { baseRoutes } from "../../routing/routes";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { padding } from "../../theming/util-style-functions/spacing";
import { mq } from "../../theming/util-style-functions/responsive";
import { coverParent, fixedBottomRight, fullViewport } from "../../theming/util-style-functions/position";
import { spacing, zIndex } from "../../theming/design-tokens/spacing";
import { styled } from "styled-components";
import ThemeToggle from "../ThemeToggle";
import { fontFamily, fontSize, fontWeight } from "../../theming/util-style-functions/typography";
import { textColor } from "../../theming/util-style-functions/colors";
import BottomBar from "../BottomBar";
import { useCursorEffect } from "../../hooks/useCursorEffect";

interface SiteLayoutProps {
    children: React.ReactNode[] | React.ReactNode,
    toggleTheme: () => void
}

const MainContent = createStyledMotionComponent('div')(props => `
    height: 80%;
    min-height: 80%;
    max-height: 80%;
`);

const LayoutContainer = createStyledMotionComponent('div')(props => `
    ${padding("xxl")}
    ${coverParent}
`)


const BrandTextContainer = createStyledMotionComponent('div')(props => `
  grid-gap: 0rem;
`)

const textSize = 'xsmall'

const Text = createStyledMotionComponent('p')(props => `
  ${fontSize(textSize)}
  ${textColor(props.theme, 'text')}
  ${fontWeight('bold')}
  ${fontFamily()}
  text-transform: uppercase;
`)


export default function SiteLayout({ children, toggleTheme }: SiteLayoutProps) {
    useCursorEffect()
    return (
        <BackgroundImage>
            <LayoutContainer>
                <NavBar links={baseRoutes} toggleTheme={toggleTheme} />
                <MainContent>
                    {children}
                </MainContent>
                <BottomBar toggleTheme={toggleTheme} />
            </LayoutContainer>
        </BackgroundImage>
    );

}
