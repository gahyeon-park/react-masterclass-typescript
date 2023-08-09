import styled from 'styled-components';

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

// styled component에 props type 전달
const Container = styled.div<ContainerProps>`
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  background-color: ${props => props.bgColor};
  border: 1px solid ${props => props.borderColor};
  text-align: center;
  color: white;
`;

// ※ props가 필수가 아닌 선택사항일 경우, props명 뒤에 '?' 표기
interface CircleProps {
  bgColor: string; // is required
  borderColor?: string; // is optional
  text?: string;
}

// 일반 component에 props type 전달
function Circle({ bgColor, borderColor, text = "default text" } : CircleProps) {
  // ※ prop type에 디폴트값을 주는 방법: ↑↑↑ 1. 인자값에 디폴트값 지정(function Circle({ ... text = "default text" }))
  return (
    // ※ prop type에 디폴트값을 주는 방법: ↓↓↓ 2. props받을 때 디폴트값 지정 (borderColor={borderColor ?? bgColor)

    // Circle 컴포넌트에서 선택적으로 부여하는 borderColor props는 선택사항이므로 주어지지 않을 수 있지만,
    // 최종적으로 렌더링되는 Container styled component에서는 border스타일을 그리기 위해 borderColor props가 필수로 type되어 있다. (borderColor: string;)
    // ∴ Circle 컴포넌트로부터 borderColor props가 주어지지 않았을 경우(=> borderColor: undefined), 
    // Container 컴포넌트의 borderColor props 디폴트값으로 bgColor props값을 전달한다. (=> borderColor ?? bgColor)
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  )
}

export default Circle;

// interface PlayerShape {
//   name: string;
//   age: number;
// }

// const sayHello = (playerObj : PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old.`;

// sayHello({ name: 'gh', age: 36 });
// sayHello({ name: 'hi', age: 12, hello: 1})

