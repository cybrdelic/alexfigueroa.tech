// imports
import React from 'react';
import { createStyledMotionComponent } from '../../../theming/styled-motion-utils/createStyledMotionComponent';
import { CaseStudyType, ProjectType, TimelineItemType } from '../../../data/project.data';
import { Typography } from '@mui/material';
import CaseStudy from '../../CaseStudy';

// types
type ProjectDetailProps = {
  project: ProjectType;
};

const renderCaseStudy = (caseStudy: CaseStudyType) => {
  return <CaseStudy caseStudy={caseStudy} />
}

const renderCaseStudies = (caseStudies: CaseStudyType[]) => {
  return (
    <div>
      {
        caseStudies.map((caseStudy: CaseStudyType) => renderCaseStudy(caseStudy))
      }
    </div>
  )
}
// component
export default function ProjectDetail({ project }: ProjectDetailProps) {
  // Assuming 'technologies', 'team', 'images', 'features', 'capabilities', 'roadmap', 'caseStudy' exist in your ProjectType
  const { technologies, team, images, features, roadmap, caseStudies } = project;

  return (
    <StyledMotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >


      <StyledMotionH4>Technologies Used:</StyledMotionH4>
      <StyledMotionDiv>
        {technologies.map((tech, index) => (
          <StyledMotionChip key={index} label={tech} />
        ))}
      </StyledMotionDiv>

      {/* Project Features */}
      <StyledMotionH4>Features:</StyledMotionH4>
      <StyledMotionUl>
        {features.map((feature, index) => (
          <StyledMotionLi key={index}>
            {feature}
          </StyledMotionLi>
        ))}
      </StyledMotionUl>

      {/* Project Roadmap */}
      <StyledMotionH4>Roadmap:</StyledMotionH4>
      <StyledMotionUl>
        {roadmap.map((milestone: TimelineItemType, index: number) => (
          <StyledMotionLi
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Typography variant="h6">{milestone.title}</Typography>
            <Typography variant="subtitle1">{milestone.datetime}</Typography>
            <Typography variant="body1">{milestone.description}</Typography>
            {milestone.subtitle && <Typography variant="caption">{milestone.subtitle}</Typography>}
          </StyledMotionLi>
        ))}
      </StyledMotionUl>
      {renderCaseStudies(caseStudies)}
      {/* Project Team */}
      <StyledMotionH4>Team:</StyledMotionH4>
      <StyledMotionDiv>
        {team.map((member, index) => (
          <StyledMotionDiv key={index}>
            <StyledMotionAvatar src={member.avatar} alt={member.name} />
            <StyledMotionSpan>{member.name}</StyledMotionSpan>
            <StyledMotionSpan>{member.role}</StyledMotionSpan>
          </StyledMotionDiv>
        ))}
      </StyledMotionDiv>

      {/* View Documentation Button */}
      <StyledMotionButton>View Documentation</StyledMotionButton>
    </StyledMotionDiv>
  );
}

// styled components
const StyledMotionDiv = createStyledMotionComponent('div')(props => `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 15px;
  transition: all 0.3s ease-in-out;
  min-width: 100vw;
  background: linear-gradient(to right, #141E30, #243B55);  // Adding gradient background
  padding: 20px;
  box-shadow: 0px 10px 20px rgba(0,0,0,0.25);  // Adding shadow for depth perception
  &:hover {
    transform: scale(1.02);  // Slightly scale up on hover
  }
`);

const StyledMotionButton = createStyledMotionComponent('button')(props => `
  margin-top: 20px;
  background-color: #5a9;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 1.2px;
  box-shadow: 0px 5px 10px rgba(0,0,0,0.15);  // Adding shadow for depth perception
  &:hover {
    background-color: #7ab;
    transform: translateY(-2px);  // Slightly move up on hover
  }
  &:active {
    transform: translateY(0px);  // Move down when clicked
  }
`);

const StyledMotionH4 = createStyledMotionComponent('h4')(props => `
  color: #fff;
  margin-bottom: 20px;
`);

const StyledMotionChip = createStyledMotionComponent('div')(props => `
  background-color: #5a9;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
`);

const StyledMotionImg = createStyledMotionComponent('img')(props => `
  max-width: 100%;
  height: auto;
`);

const StyledMotionUl = createStyledMotionComponent('ul')(props => `
  list-style-type: disc;
  color: #fff;
  margin-left: 20px;
`);

const StyledMotionLi = createStyledMotionComponent('li')(props => `
  margin-bottom: 10px;
`);

const StyledMotionAvatar = createStyledMotionComponent('img')(props => `
  width: 50px;
  height: 50px;
  border-radius: 50%;
`);

const StyledMotionSpan = createStyledMotionComponent('span')(props => `
  display: block;
  color: #fff;
  margin-top: 5px;
`);

const StyledMotionP = createStyledMotionComponent('p')(props => `
  color: #fff;
  text-align: justify;
`);
