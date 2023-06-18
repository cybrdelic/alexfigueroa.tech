// AnimateElement.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { animationTemplates } from '../../hooks/animation/animationTemplates';

interface AnimateElementProps {
  animationName: keyof typeof animationTemplates;
  children: React.ReactNode;
}

const transitionConfig = { duration: 0.5 };

export const AnimateElement: React.FC<AnimateElementProps> = ({ animationName, children }) => {
  const animation: Variants = animationTemplates[animationName] || animationTemplates.fadeIn;

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      transition={transitionConfig}
      variants={animation}
    >
      {children}
    </motion.div>
  );
};