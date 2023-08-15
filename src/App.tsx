import Router from './Router';
import { createGlobalStyle } from 'styled-components';

// 기존의 import styled from 'styled-components';의 styled로 만든 컴포넌트는
// 스타일이 단일 태그에 국한된다. (=> const Container = styled.div<ContainerProps>`width: 200px; ..`),
// but, createGlobalStyle로 만든 컴포넌트는 렌더링될 때 전역 스코프에(<head>태그 내) 스타일들을 올려주기 때문에 
// reset.css나 웹폰트처럼 전체 문서에 적용되는 스타일을 정의할 때 사용한다.
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans 3', sans-serif;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
}
a {
  text-decoration: none;
  color: inherit;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  )
}

export default App;