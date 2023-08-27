import styled from 'styled-components';
import { spacing } from './spacing';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.md};
`;

export const FlexBox = styled.div<{ gap?: string }>`
  display: flex;

  & > *:not(:last-child) {
    margin-right: ${({ gap }) => gap || spacing.md};
  }
`;

// Use Container for wrapping page contents and FlexBox for horizontal alignment of elements.
