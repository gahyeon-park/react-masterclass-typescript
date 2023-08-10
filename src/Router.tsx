import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from './screens/Home';
import About from './screens/About';

// react-router-dom v5에서 Switch를 썼던 대신 v6에서는 Routes를 쓴다.
// function Router() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// 1. react-router-dom v6의 createBrowserRouter 함수
// └> (JSX 컴포넌트를 사용하지 않고도) BrowserRouter보다 브라우저를 좀 더 선언적으로 정의할 수 있다. 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "", // 색인(index) 경로 (children 속성으로 이미 하위경로로 정의되기 때문에 "/"를 따로 쓰지 않음)
        element: <Home />
      },
      {
        // 상위경로 "/"의 children이기 때문에 "about"은 "/"의 자식. about = /about
        // ∴ "localhost:3000/about" 진입 시 상위경로("/")도 매칭되서 <About />이 아닌 <Root />가 렌더된다.
        // <Root /> 에서 <Outlet /> 컴포넌트를 사용해, url을 보게하고 해당 url에 해당하는 컴포넌트를 렌더하게 한다.
        path: "about",
        element: <About />
      }
    ]
  }
])

export default router;