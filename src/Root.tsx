
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Root() {
  return (
    // ※ <Outlet />에 context로 데이터 전달 시,
    // 현재 이 Root 컴포넌트의 모든 자식 라우트의 컴포넌트(Home, About, User, Followers)가 useOutletContext()로 해당 데이터를 받을 수 있다.
    // ★응용: 현재 이 Root 컴포넌트에 theme 관련 state가 있고, Header 내 버튼 클릭으로 이 state를 변경하게 되면, 
    // Outlet에 context에도 변경사항이 반영되어 하위 경로의 모든 컴포넌트들도 변경된 theme 값을 공유할 수 있게 된다.
    <div>
      <Header />
      <Outlet context={{ darkMode: true }} />
    </div>
  )
}

export default Root;