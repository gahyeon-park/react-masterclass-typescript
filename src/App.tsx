import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  active: { scale: 0.8, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(30, 144, 255)", transition: { duration: 5 }}
}

function App() {
  return (
    <Wrapper>
      <Box drag variants={boxVariants} whileDrag="drag" whileHover="hover" whileTap="active" />
    </Wrapper>
  )
}

export default App;