import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Wrapper = styled(motion.div)`
  display: flex;
  width: 100vw;
  height: 100vh;  
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: white;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const boxVariant = {
  initial: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, rotateZ: 360 },
  hide: { opacity: 0, scale: 0, y: -100 }
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => {
    setShowing(prev => !prev);
  }
  return (
    <Wrapper>
      <button onClick={onClick}>Click</button>
      <AnimatePresence>{showing ? 
        <Box 
          variants={boxVariant} 
          initial="initial" 
          animate="show" 
          exit="hide"  
        /> : null}
      </AnimatePresence>
    </Wrapper>
  )
}

export default App;