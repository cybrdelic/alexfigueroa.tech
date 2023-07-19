import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectChanger from '../components/ProjectsView/ProjectChanger';
import { projectsData } from '../data/project.data';
import ProjectsLayout from '../components/ProjectsView/ProjectsLayout';


const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  position: absolute;  // Add this line to position the component
  top: 60px;  // Adjust to the height of your navbar
  left: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px; // or any maximum width you prefer
  height: calc(100vh - 60px);  // Subtract the height of your navbar
  overflow-y: auto;  // Add scroll when the content overflows
  overflow-x: hidden;
`;




const ProjectsPage: React.FC = () => {

  return (
    <Container>
      <ContentWrapper>
        <ProjectsLayout projects={projectsData} />
      </ContentWrapper>
    </Container>
  );
};

export default ProjectsPage;
