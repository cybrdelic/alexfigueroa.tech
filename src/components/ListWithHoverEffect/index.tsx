import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ListItem = styled(motion.li)`
  margin-bottom: 1rem;
  cursor: pointer;
  color: ${props => props.theme.text};

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

interface ListWithHoverEffectProps {
  items: string[];
  onItemClick: (item: string) => void;
}

export const ListWithHoverEffect: React.FC<ListWithHoverEffectProps> = ({ items, onItemClick }) => {
  const listItemVariants = {
    hidden: { y: -5, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const hoverEffect = {
    scale: 1.05,
    rotate: [0, 2, -2, 2, -2, 2, 0],
    transition: { duration: 0.5 },
  };

  return (
    <ul>
      {items.map((item, index) => (
        <ListItem
          key={index}
          onClick={() => onItemClick(item)}
          variants={listItemVariants}
          whileHover={hoverEffect}
        >
          {item}
        </ListItem>
      ))}
    </ul>
  );
}

export default ListWithHoverEffect;
