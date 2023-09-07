import styled from 'styled-components';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;  
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 200px;
  height: 200px;
  background-color: rgb(255, 255, 255);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0); // useMotionValue(): 애니메이션의 특정 값을 계속 추적할 수 있게 해준다.

  console.log(x);
  useEffect(() => {
    x.onChange(() => console.log(x.get()))
  }, [x]);

   return (
    <Wrapper>
      <button onClick={() => x.set(200)}>Click me</button>
      <Box style={{ x: x }} drag="x" dragSnapToOrigin />
    </Wrapper>
  )
}

export default App;