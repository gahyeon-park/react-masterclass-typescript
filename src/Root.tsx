
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Root() {
  return (
    // 3. <Outlet />: Router.tsx의 router에서 하위 경로요소(children)를 렌더링하기 위해 상위경로 요소(<Root />)에서 사용하는 컴포넌트.
    // 상위경로("/")가 정확히 일치하면(localhost:3000/) 하위 색인경로를 렌더링한다. (=> children 요소중에 path: ""인 <Home />)
    // but, path: ""인 하위경로가 없을 경우 아무것도 렌더링하지 않음.
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Root;