// styled.d.ts (= styled.declarations.ts) : styled components에 대한 TypeScript 정의 파일

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    cardBgColor: string;
    textColor: string;
    accentColor: string;
  }
}