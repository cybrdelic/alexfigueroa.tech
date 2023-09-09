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

const BottomBar = styled.div`
  z-index: ${zIndex.foreground + 10};
  height: 10%;
  min-height: 10%;
  max-height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${mq('md')} {
    bottom: ${spacing.md};
    right: ${spacing.md};
  }
`;

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
    return (
        <BackgroundImage>
            <LayoutContainer>
                <NavBar links={baseRoutes} toggleTheme={toggleTheme} />
                <MainContent>
                    {children}
                </MainContent>
                <BottomBar>
                    <BrandTextContainer>
                        <Text>Alex Figueroa</Text>
                        <Text>Full-Stack Software Developer</Text>
                    </BrandTextContainer>
                    <ThemeToggle onClick={toggleTheme} />
                </BottomBar>
            </LayoutContainer>
        </BackgroundImage>
    );

}
