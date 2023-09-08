import styled from 'styled-components';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { useEffect } from 'react';

const Wrapper = styled(motion.div)`
  display: flex;
  width: 100vw;
  height: 200vh;  
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
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
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x, 
    [-800, 800], 
    [
      'linear-gradient(135deg, rgb(104, 225, 255), rgb(0, 119, 216))',
      'linear-gradient(135deg, rgb(130, 255, 47), rgb(255, 132, 31))',
    ]);
  const { scrollY, scrollYProgress} = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  // useEffect(() => {
  //   scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()));
  // },[scrollY, scrollYProgress]);

  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x: x, rotateZ, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  )
}

export default App;