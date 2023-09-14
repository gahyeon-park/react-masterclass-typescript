import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 500vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 200px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
  font-size: 28px;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClick = () => setClicked((prev) => !prev);
  return (
    <Wrapper onClick={toggleClick}>
      <Grid>
        <Box layoutId="first" />
        <Box />
        <Box />
        <Box />
      </Grid>

      <AnimatePresence>
        {clicked ? (
          <Overlay
            initial={{ backgroundColor: "rgba(0,0,0, 0)" }}
            animate={{ backgroundColor: "rgba(0,0,0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0,0,0, 0)" }}
          >
            <Box layoutId="first" style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
