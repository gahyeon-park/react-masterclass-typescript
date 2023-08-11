import { useParams, Outlet, Link } from "react-router-dom";
import { users } from '../../db';

function User() {
  const { userId } = useParams();
  
  // ※ 현재 이 컴포넌트에 자식 라우트가 있다면, <Outlet />이 자식 라우트의 컴포넌트를 렌더한다.
  return (
    <div>
      <h1>User with it {userId} is named: {users[Number(userId)-1].name}</h1>
      <hr />
      <Link to="followers">See followers</Link>
      <Outlet />
    </div>
  )
}

export default User;