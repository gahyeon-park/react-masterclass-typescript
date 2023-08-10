import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './screens/Home';
import About from './screens/About';

// react-router-dom v5에서 Switch를 썼던 대신 v6에서는 Routes를 쓴다.
function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;