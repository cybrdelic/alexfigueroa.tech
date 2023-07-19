import React, { useState, useCallback } from 'react';
import { Popover as MuiPopover, Button as MuiButton, ListItem as MuiListItem, ListItemText as MuiListItemText } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../../hooks/useTheme';

interface Project {
  id: string;
  name: string;
}

interface ProjectChangerProps {
  projects: Project[];
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  background: ${props => props.theme.body};
`;

const StyledButton = styled(MuiButton)`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: ${props => props.theme.fontFamily};
  font-weight: bold;
  color: ${props => props.theme.text};
  background: ${props => props.theme.cardBackground};
  box-shadow: ${props => props.theme.shadow};
  transition: ${props => props.theme.transition};
  &:hover {
    background: ${props => props.theme.hover};
  }
`;

const StyledPopover = styled(MuiPopover)`
  .MuiPopover-paper {
    background-color: ${props => props.theme.cardBackground};
    box-shadow: ${props => props.theme.shadow};
  }
`;

const StyledListItem = styled(MuiListItem)`
  background-color: ${props => props.theme.cardBackground};
  &:hover {
    background-color: ${props => props.theme.hover};
  }
`;

const StyledListItemText = styled(MuiListItemText)`
  .MuiTypography-root {
    color: ${props => props.theme.text};
    font-family: ${props => props.theme.fontFamily};
  }
`;

const fadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const ProjectChanger: React.FC<ProjectChangerProps> = ({ projects }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentProject, setCurrentProject] = useState<Project>(projects[0]);
  const [closing, setClosing] = useState(false);

  const theme = useTheme();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setClosing(false);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setClosing(true);
    setTimeout(() => {
      if (closing) setAnchorEl(null);
    }, 500); // delay of 500ms
  };

  const handlePopoverEnter = () => {
    setClosing(false);
  };

  const handleChangeProject = useCallback((project: Project) => {
    setCurrentProject(project);
    handlePopoverClose();
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'project-popover' : undefined;

  return (
    <Container
      variants={fadeVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <StyledButton
        aria-controls={id}
        onMouseEnter={handlePopoverOpen}
      >
        {currentProject.name}
      </StyledButton>

      <StyledPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        onMouseEnter={handlePopoverEnter}
        onMouseLeave={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {projects.map((project) => (
          <StyledListItem key={project.id} onClick={() => handleChangeProject(project)}>
            <StyledListItemText primary={project.name} />
          </StyledListItem>
        ))}
      </StyledPopover>
    </Container>
  );
};

export default ProjectChanger;
