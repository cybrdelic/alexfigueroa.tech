import React from 'react';
import styled from 'styled-components';
import { projectsData } from '../data/project.data';
import ProjectsLayout from '../components/ProjectsView/ProjectsLayout';
import { absoluteCenter } from '../theming/util-style-functions/position';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;


`;

const ProjectsPage: React.FC = () => {

  return (
    <Container>
      <ProjectsLayout projects={projectsData} />
    </Container>
  );
};


export default ProjectsPage;
