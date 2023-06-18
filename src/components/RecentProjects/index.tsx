import React from 'react';
import styled from 'styled-components';
import { withAnimations } from '../../hooks/animation/withAnimations';
import { useTheme } from '../../hooks/useTheme';

const mockProjects = [
  {
    title: 'Project 1',
    description: 'This is a description of Project 1',
  },
  {
    title: 'Project 2',
    description: 'This is a description of Project 2',
  },
  // More projects...
];

const ProjectsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const RecentProjects = () => {
  const theme = useTheme();
  
  return (
    <ProjectsContainer theme={theme}>
    </ProjectsContainer>
  );
}

export default withAnimations('slideIn')(RecentProjects);
