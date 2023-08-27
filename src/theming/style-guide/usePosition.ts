import { css } from 'styled-components';

type PositionType = 'static' | 'relative' | 'absolute' | 'fixed';

export const usePosition = (type: PositionType = 'relative') => {
    return css`
    position: ${type};
    // You can add top, bottom, left, and right if needed.
  `;
};
