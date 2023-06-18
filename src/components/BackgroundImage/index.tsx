import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

interface BackgroundImageProps {
  imageurl: string,
  children: React.ReactNode, 
}

// This will be the container for the background image and dimmed overlay
const BackgroundImageContainer = styled.div<{ imageurl: string, theme: any}>`
  background: url(${props => props.imageurl}) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
`;

const BlankContainer = styled.div`
  opacity: 30%;
  width: 100vh;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`

// This will be the container for the content of the page (children)
const ContentContainer = styled.div`
  position: relative; // Ensures the content is above the dimmed background
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function BackgroundImage({ imageurl, children}: BackgroundImageProps) {

  const theme = useTheme()
  return (
    <>
      <BlankContainer>
        <BackgroundImageContainer imageurl={imageurl} theme={theme} />
      </BlankContainer>
      <ContentContainer>
        {children}
      </ContentContainer>
    </>
  );
}
