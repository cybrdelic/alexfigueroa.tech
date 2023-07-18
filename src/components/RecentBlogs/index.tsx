import React from 'react';
import styled from 'styled-components';
import { withAnimations } from '../../hooks/animation/withAnimations';
import { useTheme } from '../../hooks/useTheme';

const mockBlogs = [
  {
    title: 'Blog 1',
    summary: 'This is a summary of Blog 1',
  },
  {
    title: 'Blog 2',
    summary: 'This is a summary of Blog 2',
  },
  // More blogs...
];

const BlogsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const RecentBlogs = () => {
  const theme = useTheme();
  
  return (
    <BlogsContainer theme={theme}>
    </BlogsContainer>
  );
}

export default withAnimations('slideIn')(RecentBlogs);
