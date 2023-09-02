import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectChanger from '../components/ProjectsView/ProjectChanger';
import { projectsData } from '../data/project.data';
import ProjectsLayout from '../components/ProjectsView/ProjectsLayout';
import PageTransition from '../components/PageTransition';
import { flexColumn } from '../theming/util-style-functions/layout';
import { absoluteCenter } from '../theming/util-style-functions/position';


const Container = styled.div`
  display: flex;
  justify-content: center;

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
        <ProjectsLayout projects={projectsData} />
      </Container>
    </PageTransition>
  );
};


export default ProjectsPage;
