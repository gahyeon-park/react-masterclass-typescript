// 3. themes.ts 파일 생성

// 4. styled.d.ts 파일에서 정의한 DefaultTheme 인터페이스 import
import { DefaultTheme } from 'styled-components';

// 5. 인터페이스에서 정의한 속성 그대로 lightTheme과 darkTheme을 만들고 내보낸다.
export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black"
};

export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white"
};