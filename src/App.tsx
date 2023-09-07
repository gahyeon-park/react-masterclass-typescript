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
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
 
  return (
    <Wrapper>
      <Box 
        transition={{ type: "spring", bounce: 0.3, delay: 0.5 }} 
        initial={{ scale: 0 }} 
        animate={{ scale: 1, rotateZ: 360, borderRadius: "50px" }}
      />
      {/* <motion.div></motion.div> */}
    </Wrapper>
  )
}

export default App;