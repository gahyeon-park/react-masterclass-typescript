import styled from 'styled-components';

// 7. 현재 App 컴포넌트가, theme 속성을 가진 ThemeProvider로 감싸져있기 때문에 theme props를 받아 사용할 수 있다.
const Container = styled.div`
  background-color: ${props => props.theme.bgColor}
`;

const H1 = styled.h1`
  color: ${props => props.theme.textColor}
`;


interface DummyProps {
  text: string;
  active?: boolean;
}

function Dummy({ text, active = false } : DummyProps) {
  return <h1>{text}</h1>
}

function App() {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
  }

  return (
    <Container>
      <H1>protected</H1>
      <Dummy active text="hello" />
        <button onClick={onClick}>Click me!</button>
    </Container>
  )
}

export default App;