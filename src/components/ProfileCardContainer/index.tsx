// ProfileCardContainer.tsx
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { adjustTransparency } from '../../utils/adjustTransparency';

const ProfileCardContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0.5rem;
  background-color: ${props => adjustTransparency(props.theme.colors.text, 0.6)};
  padding: 1rem;
  color: ${props => props.theme.text}
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

export default ProfileCardContainer;
