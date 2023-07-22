import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectChanger from '../components/ProjectsView/ProjectChanger';
import { projectsData } from '../data/project.data';
import ProjectsLayout from '../components/ProjectsView/ProjectsLayout';
import PageTransition from '../components/PageTransition';


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
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 60px);  // Subtract the height of your navbar
  overflow-y: auto;  // Add scroll when the content overflows
  overflow-x: hidden;
`;


const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 50,
    transition: {
      duration: 0.5,
    },
  },
};



const ProjectsPage: React.FC = () => {

  return (
    <PageTransition>
      <Container>
        <ContentWrapper>
          <ProjectsLayout projects={projectsData} />
        </ContentWrapper>
      </Container>
    </PageTransition>
  );
};


export default ProjectsPage;
