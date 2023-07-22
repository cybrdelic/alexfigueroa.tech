import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectChanger from '../components/ProjectChanger';
import { projectsData } from '../data/project.data';
import PageTransition from '../components/PageTransition';

const projectData = [
  {
    title: 'Project 1',
    description: 'This is a description of project 1.',
    technologies: ['React', 'JavaScript', 'CSS'],
    link: 'https://example.com/project1',
    media: 'https://via.placeholder.com/150', // Replace with actual URLs
    features: ['Feature 1', 'Feature 2'],
    github: 'https://github.com/example/project1',
  },
  {
    title: 'Project 2',
    description: 'This is a description of project 2.',
    technologies: ['Python', 'Flask', 'SQLite'],
    link: 'https://example.com/project2',
    media: 'https://via.placeholder.com/150', // Replace with actual URLs
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    github: 'https://github.com/example/project1',
  },
  {
    title: 'Project 3',
    description: 'This is a description of project 3.',
    technologies: ['Java', 'Spring Boot', 'MySQL'],
    link: 'https://example.com/project3',
    media: 'https://via.placeholder.com/150', // Replace with actual URLs
    features: ['Feature 1', 'Feature 2'],
    github: 'https://github.com/example/project1',
  },
  {
    title: 'Project 4',
    description: 'This is a description of project 4.',
    technologies: ['C#', '.NET', 'SQL Server'],
    link: 'https://example.com/project4',
    media: 'https://via.placeholder.com/150', // Replace with actual URLs
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    github: 'https://github.com/example/project1',
  },
  {
    title: 'Project 5',
    description: 'This is a description of project 5.',
    technologies: ['JavaScript', 'Node.js', 'MongoDB'],
    link: 'https://example.com/project5',
    media: 'https://via.placeholder.com/150', // Replace with actual URLs
    features: ['Feature 1', 'Feature 2'],
    github: 'https://github.com/example/project1',
  },
];

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


const ProjectPreview = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const PreviewContainer = styled.div`
  color: ${props => props.theme.text};
  border-radius: 5px;
  padding: 2rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
`;

const PreviewFeatures = styled.div`
  margin-bottom: 2rem;
`;

const PreviewButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PreviewButton = styled.a`
  color: ${props => props.theme.primary};
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.secondary};
  }
`;

const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(projectData[0]);

  return (
    <PageTransition>
      <Container>
        <ContentWrapper>
          <ProjectChanger projects={projectsData} />

          <ProjectPreview>
            <PreviewContainer>
              <h2>{selectedProject.title}</h2>
              <PreviewImage src={selectedProject.media} alt={selectedProject.title} />
              <h3>Features</h3>
              <PreviewFeatures>
                <ul>
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </PreviewFeatures>
              <PreviewButtonContainer>
                <PreviewButton href={selectedProject.link} target="_blank" rel="noreferrer">
                  View Project
                </PreviewButton>
                <PreviewButton href={selectedProject.github} target="_blank" rel="noreferrer">
                  View GitHub
                </PreviewButton>
              </PreviewButtonContainer>
            </PreviewContainer>
          </ProjectPreview>
        </ContentWrapper>
      </Container>
    </PageTransition>
  );
};

export default ProjectsPage;
