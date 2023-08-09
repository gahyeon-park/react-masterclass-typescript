import { useState } from "react";
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
  // const [value, setValue] = useState(0);
  const [value, setValue] = useState<number|string>(0);  // state 값의 타입이 하나로 고정되지 않고 바뀔 수 있을 경우, useState<number|string>와 같이 표기
  setValue(true);
  setValue('hello');
  setValue(1);
  
  return (
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

