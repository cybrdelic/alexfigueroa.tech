import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { animated, useSpring } from 'react-spring';
import { flexColumn } from '../../theming/util-style-functions/layout';
import { padding } from '../../theming/util-style-functions/spacing';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import { rounded } from '../../theming/util-style-functions/misc';
import { fontFamily, fontSize, fontWeight, letterSpacing } from '../../theming/util-style-functions/typography';
import { projectsData } from '../../data/project.data';
import GitHubHeatmapContainer from '../GithubHeatmapContainer';
import { FaDatabase, FaDocker, FaGitAlt, FaNodeJs, FaPython, FaReact } from 'react-icons/fa';
import { adjustTransparency } from '../../utils/adjustTransparency';
import { Theme } from '../../theming/theme';

const HeroContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const Pane = styled.div`
  ${flexColumn}
  ${padding('sm')}
`;

const CTAButton = styled(motion.button)`
  ${padding('md')}
  ${rounded('lg')}
  ${fontFamily()}
  background-color: ${projectsData.CodebasedUtils.colors.secondary};
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0.5rem;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; // Darken on hover, adjust as per theme
  }
`;

const GhostButton = styled(CTAButton)`
  background-color: transparent;
  color: white; // Same as the CTAButton color
  border: 2px solid ${projectsData.CodebasedUtils.colors.secondary};

  &:hover {
    background-color: rgba(0, 123, 255, 0.1); // Slight background on hover
  }
`;
const CTASection = styled(Pane)`
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
`;

const RightPane = styled('div')`
width: 100%;
display: flex;
flex-direction: column;
justify-content: stretch;
align-items: stretch;
background-color: black;
`;

const revealAnimation = keyframes`
  0% {
    clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
`;

const HeroTitle = styled(motion.h1)`
  ${fontSize('h4')}
  ${fontFamily("Nova Square")}
  font-weight: 900;
  width: 100%;
  text-transform: uppercase;
  position: relative;
  text-align: left;
  color: white;
  overflow: hidden;
  animation: ${revealAnimation} 3s linear;
`;

const HeroTagline = createStyledMotionComponent(animated.h2)(props => `
  ${fontSize('small')}
  ${letterSpacing('wider')}
  font-weight: 900;
  padding: 0.5rem;
  border-radius: 10px;
  color: white;
  text-shadow: 0px 0px 10px ${props?.theme?.colors?.secondary};
  text-align: flex-start;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  color: ${projectsData.CodebasedUtils.colors.secondary}
`);

const TopHalf = createStyledMotionComponent('div')(props => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`)

const HeroSection = createStyledMotionComponent('div')(props => `
  ${flexColumn}
  align-items: flex-start;
  gap: 0rem;
  flex-basis: 70%;
`)

const Top = createStyledMotionComponent('div')(props => css`
  display: flex;
  flex-direction: row;
`)
const Center = createStyledMotionComponent('div')(props => css`
  display: flex;
  flex-direction: row;
  width: 100%;
`)



const Bottom = createStyledMotionComponent('div')(props => css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`)

const AboutSection = createStyledMotionComponent('div')(props => css`
  ${flexColumn}
  ${fontSize('h6')}
  ${fontFamily()}
  ${fontWeight('normal')}
  color: ${props => props.theme.colors.text};
  width: 100%;
  margin-right: 1rem;
  flex-grow: 1;
  min-height: 20rem;
  max-height: 20rem;
`);

const BlogPreviewSection = createStyledMotionComponent('div')(props => css`
  display: flex;
  flex-direction: row;
  ${padding('md')}
  ${fontSize('small')}
  ${fontFamily('sans-serif')}
  ${fontWeight('normal')}
  color: ${props => props.theme.colors.text};
  gap: 1rem;
  flex-grow: 1;
`);

const BlogPreview = createStyledMotionComponent('div')(props => css`
  ${padding('sm')}
  border-radius: 15px;
  background-color: ${props.theme.colors.primary};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${props.theme.colors.secondary};
  }
`);

const TechAndToolsSection = createStyledMotionComponent('div')(props => css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${fontSize('small')}
  ${fontFamily('monospace')}
  ${fontWeight('bold')}
  color: ${props => props.theme.colors.text};
  background-color: black;
  flex: ${props.flex}
`);

const HeroComponent = () => {
  const theme = useTheme();

  const springProps = useSpring({

    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 0, friction: 14 },
    duration: 0.1
  });

  const BlogPreviewComponent = ({ title, description, link }) => (
    <BlogPreview style={{}}>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} style={{ color: 'white', textDecoration: 'underline' }}>
        Read more
      </a>
    </BlogPreview>
  );

  const StyledAboutSection = createStyledMotionComponent('section')(props => `
    color: #e6e6e6; // Soft white for readability
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 0rem;
    padding-top: 0rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 800px; // Ensuring the text is not too stretched on larger screens
  `);
  const StyledHeading = createStyledMotionComponent('h2')(props => `
    color: ${projectsData.CodebasedUtils.colors.secondary};
    margin-bottom: 12px;
    height: 100%;
    margin-top: 0rem;
  `);
  const StyledParagraph = createStyledMotionComponent('p')(props => `
  color: #a8b2d1; // Lighter text for a modern, sleek look
  font-size: 18px;
  line-height: 1.7;
  `);

  const AboutSectionComponent = () => (
    <StyledAboutSection
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <StyledHeading>
        Alex Figueroa | <span style={{ color: 'rgba(250,250,250,1)' }}>Full Stack Developer and Automation Expert</span>
      </StyledHeading>
      <StyledParagraph>
        I’m a full-stack developer with a knack for creating Python-based automation tools that streamline and enhance developer workflows. My portfolio spans front-end innovation to back-end efficiency, with a special focus on crafting tools that simplify and automate tasks, leading to more productive and error-free development processes. I’m passionate about driving efficiency and quality in software development through intelligent automation.
      </StyledParagraph>
      <CTASection>
        <CTAButton as="a" href="/projects" >
          View My Projects
        </CTAButton>
        <GhostButton as="a" href="mailto:your.email@example.com">
          Get In Touch
        </GhostButton>
      </CTASection>
    </StyledAboutSection>
  );

  const TechAndToolsContainer = createStyledMotionComponent('div')(props => css`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;  // Adjust this padding as needed
  ul {
    list-style: none;
    padding: 0;
  }
`);

  const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

  /* Tooltip arrow */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${props => props.theme.colors.secondary} transparent transparent transparent;
  }
`;

  const IconsGrid = createStyledMotionComponent('div')(props => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3-column grid, adjust as needed
  gap: 1rem;
  justify-items: space-between;
  border: solid 0.1rem rgba(250,250,250,0.4);
  padding: 1rem;
`);

  const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover ${Tooltip} {
    visibility: visible;
  }
`;

  const PreviewSection = createStyledMotionComponent('section')(props => css`
  flex-basis: ${props.width ?? '100%'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;  // Adjust this padding as needed
  ul {
    list-style: none;
    padding: 0;
  }
`);

  const PreviewContainer = createStyledMotionComponent('div')(props => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 3-column grid, adjust as needed
    justify-items: space-between;
    border: solid 0.1rem rgba(250,250,250,0.4);
    padding: 0.5rem;
    width: 100%;
`);

  const ToolIcon = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  margin: 10px;

  &:hover {
    color: ${projectsData.CodebasedUtils.colors.secondary}; // Neon hover effect
  }

  svg {
    fill: currentColor;
    transition: transform 0.2s ease-in-out;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

  const SeeAllButton = createStyledMotionComponent(motion.button)(props => css`
  ${fontFamily()}
  ${fontSize('xsmall')}
  background-color: transparent;
  color: rgba(250,250,250,0.4);
  margin: auto;
  margin-right: 0rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgba(255, 0, 153, 0.1);
    color: ${projectsData.CodebasedUtils.colors.secondary}; // Neon text color
  }
`);

  const PreviewSectionTitle = createStyledMotionComponent('h2')(props => css`
    ${fontFamily('Nova Square')}
      `)

  // PreviewSectionComponent
  const PreviewSectionComponent = ({ title, items, buttonLabel, buttonLink, layout, flex }) => (
    <PreviewSection flex={flex} layout={layout}>
      <PreviewSectionTitle>{title}</PreviewSectionTitle>
      <PreviewContainer>
        {items.map((item, index) => (
          <ToolIcon key={index}>
            {item.icon}
          </ToolIcon>
        ))}
      </PreviewContainer>
      <SeeAllButton as="a" href={buttonLink}>
        {buttonLabel}
      </SeeAllButton>
    </PreviewSection>
  );
  // Component for individual icons with tooltips

  // TechAndToolsSectionComponent with just a few Tools
  function TechAndToolsSectionComponent({ flex }) {
    return (
      <TechAndToolsSection>
        <PreviewSectionComponent
          title="Favorite Tools"
          items={[
            { icon: <FaPython size="2em" />, label: "Python" },
            { icon: <FaReact size="2em" />, label: "React" },
            { icon: <FaNodeJs size="2em" />, label: "Node.js" },
            { icon: <FaDatabase size="2em" />, label: 'PostgreSQL' },
            { icon: <FaGitAlt size="2em" />, label: 'Git' },
            { icon: <FaDocker size="2em" />, label: 'Docker' }
          ]}
          buttonLabel={"See All Tools"}
          buttonLink="/profile"
          layout="row"
          flex={flex} />
      </TechAndToolsSection >
    );
  }



  const BlogPreviewSectionComponent = () => {
    const blogPosts = [
      { title: "Blog Post 1", description: "Description of blog post 1", link: "/blog/1" },
      { title: "Blog Post 1", description: "Description of blog post 1", link: "/blog/1" },
      { title: "Blog Post 1", description: "Description of blog post 1", link: "/blog/1" },
      { title: "Blog Post 1", description: "Description of blog post 1", link: "/blog/1" },
      // Add more blog posts here
    ];

    return (
      <BlogPreviewSection>
        {blogPosts.map((post, index) => (
          <BlogPreviewComponent key={index} title={post.title} description={post.description} link={post.link} />
        ))}
      </BlogPreviewSection>
    );
  };



  return (
    <TopHalf>

      <Top>
        <HeroSection>
          <HeroTagline theme={theme} style={springProps}>
            Full-Stack Development Meets Full-Cycle Automation.
          </HeroTagline>
          <HeroTitle theme={theme}>
            Streamlined Solutions – Full-Stack Development with an Eye for Automation
          </HeroTitle>

        </HeroSection>

      </Top>
      <Bottom>
        <HeroContainer>
          <li style={{ backgroundImage: `url('/background.png')`, width: '60rem', height: '20rem' }}>

          </li>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <TechAndToolsSectionComponent flex="3" />
            <TechAndToolsSectionComponent flex="7" />
          </div>

        </HeroContainer>
        <RightPane>
          <AboutSectionComponent />
          <BlogPreviewSectionComponent />
        </RightPane>
      </Bottom>

    </TopHalf >
  );
};
export default HeroComponent
