import React from 'react';
import { AnimateElement } from '../../components/AnimateElement';
import { animationTemplates } from './animationTemplates';

interface WithAnimationsProps {
}

export function withAnimations(animationName: keyof typeof animationTemplates) {
  return function (Component: React.ElementType) {
    return function(props: React.PropsWithChildren<WithAnimationsProps>): React.ReactElement {
      const processChildren = (children: React.ReactNode): React.ReactNode => {
        return React.Children.map(children, child => {
          if (!React.isValidElement(child) || child.props.noAnimation) {
            return child;
          }

          let childProps = {};
          if ('children' in childProps) {
            childProps.children = processChildren(child.props.children);
          }

          const animation = child.props.animation || animationName;
          return (
            <AnimateElement animationName={animation}>
              {React.cloneElement(child, childProps)}
            </AnimateElement>
          );
        });
      };

      return <Component {...props}>{processChildren(props.children)}</Component>;
    }
  }
}
