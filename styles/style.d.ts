import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: string;
    font: string;
    scheme: string;
  }
}