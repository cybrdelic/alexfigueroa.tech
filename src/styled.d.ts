import 'styled-components';
import { lightTheme, darkTheme } from './theming/theme';

declare module 'styled-components' {
  type Theme = typeof lightTheme | typeof darkTheme;
  export interface DefaultTheme extends Theme {}
}