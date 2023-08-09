import styled from 'styled-components';

interface ContainerProps {
  bgColor: string;
}

// styled component에 props type 전달
const Container = styled.div<ContainerProps>`
  width: 20rem;
  height: 20rem;
  border-radius: 10rem;
  background-color: ${props => props.bgColor};
`;

interface CircleProps {
  bgColor: string;
}

// 일반 component에 props type 전달
function Circle({ bgColor } : CircleProps) {
  return (
    <Container bgColor={bgColor} />
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

