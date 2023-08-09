// styled.d.ts (= styled.declarations.ts) : styled components에 대한 TypeScript 정의 파일

// 1. styled components를 import하고
import 'styled-components';

// 2. 우리의 styled components의 테마 정의를 확장
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
  }
}