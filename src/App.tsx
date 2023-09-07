import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;  
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, .3);
  border-radius: 40px;
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
  hover: { rotateZ: 90 },
  click: { borderRadius: "100px" },
  drag: { }
}

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box 
          drag 
          dragConstraints={biggerBoxRef}
          // dragConstraints={{ top: -200, right: 200, bottom: 200, left: -200 }} 
          dragSnapToOrigin
          dragElastic={.5}
          variants={boxVariants} 
          whileDrag="drag" 
          whileHover="hover" 
          whileTap="click" 
        />
      </BiggerBox>
    </Wrapper>
  )
}

export default App;