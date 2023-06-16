import React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

interface BackgroundImageProps {
  imageURL: string,
  children: React.ReactNode, 
  theme: string,
}

const Background = styled.div<{ imageURL: string }>`
  background: url(${props => props.imageURL}) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${props => props.theme === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
  }
`;

export default function BackgroundImage({ imageURL, children }: BackgroundImageProps) {
  return (
    <Background imageURL={imageURL}>
      {children}
    </Background>
  );
}
