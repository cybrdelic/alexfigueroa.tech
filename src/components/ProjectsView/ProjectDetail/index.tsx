// imports
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Chip, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ProjectType } from '../../../data/project.data';
import { ProjectTitleAndLogo } from '../ProjectLogoAndText';
import { createStyledMotionComponent } from '../../../utils/createStyledMotionComponent';
import BoldHeaderText from '../BoldHeaderText';

// types
type ProjectDetailProps = {
  project: ProjectType;
};

// component
export default function ProjectDetail({ project }: ProjectDetailProps) {
  // Assuming 'technologies', 'team', 'images', 'features' exist in your ProjectType
  const { technologies, team, images, features } = project;

  return (
    <StyledMotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Project Images Carousel
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Project Slide ${index + 1}`} />
        ))}
      </div> */}
      <BoldHeaderText text={project.name} />
      <Typography variant="h4" gutterBottom>Technologies Used:</Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {technologies.map((tech, index) => (
          <Chip key={index} label={tech} />
        ))}
      </Box>

      {/* Project Features */}
      <Typography variant="h4" gutterBottom>Features:</Typography>
      <List>
        {features.map((feature, index) => (
          <ListItem key={index}>
            <ListItemText primary={feature} />
          </ListItem>
        ))}
      </List>

      {/* Project Team */}
      <Typography variant="h4" gutterBottom>Team:</Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {team.map((member, index) => (
          <Box key={index} display="flex" flexDirection="column" alignItems="center">
            <Avatar src={member.avatar} alt={member.name} />
            <Typography variant="body2">{member.name}</Typography>
            <Typography variant="caption">{member.role}</Typography>
          </Box>
        ))}
      </Box>

      {/* View Documentation Button */}
      <StyledButton variant="outlined" color="primary">View Documentation</StyledButton>
    </StyledMotionDiv>
  );
}

// styled components
const StyledMotionDiv = createStyledMotionComponent('div')(props => `
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #111;
  color: white;
  border-radius: 15px;
  transition: all 0.3s ease-in-out;

  min-width: 80%;
  &:hover {
    transform: scale(1.02);
  }
`);

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
