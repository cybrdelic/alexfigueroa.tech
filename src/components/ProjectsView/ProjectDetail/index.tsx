// imports
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ProjectType } from '../../../data/project.data';

// types
type SectionProps = {
  id: string;
  title: string;
  link: string;
};

type ProjectDetailProps = {
  project: ProjectType;
  sections?: SectionProps[];
};

// component
export default function ProjectDetail(props: ProjectDetailProps) {
  const { sections } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Typography variant="h2" gutterBottom>Exploring Cybrnet through the Lens of the Distributed Autonomous Intelligence Framework (DAIF)</Typography>
      <Typography variant="h4" gutterBottom>Overview:</Typography>
      <Typography paragraph>This comprehensive guide unravels...</Typography>
      <Typography variant="h4" gutterBottom>Content Map</Typography>
      {sections?.map((section) => (
        <div key={section.id}>
          <Typography variant="h6" gutterBottom>
            <StyledLink to={section.link}>{section.title}</StyledLink>
          </Typography>
        </div>
      ))}
      <StyledButton variant="outlined" color="primary">View Documentation</StyledButton>
    </motion.div>
  );
}

// styled components
const ProjectLogo = styled.img`
  height: 100px;
  width: 100px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: #5a9;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
    background-color: #5a9;
    color: white;
    border-radius: 20px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #7ab;
    }
  }
`;
