// styled.d.ts (= styled.declarations.ts) : styled components에 대한 TypeScript 정의 파일

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}