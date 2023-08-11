import { useParams, Outlet, Link, useOutletContext,  } from "react-router-dom";
import { users } from '../../db';

function User() {
  const { userId } = useParams();
  console.log('User', useOutletContext()); // <Root /> 컴포넌트에서 context로 전달한 { darkMode: true }
  
  
  // 자식 컴포넌트인 Followers에서도 user 데이터를 공유하고 싶다면,
  // Followers에서도 useParams()를 써서 userId를 받을 수 있다.
  return (
    <div>
      <h1>User with it {userId} is named: {users[Number(userId)-1].name}</h1>
      <hr />
      <Link to="followers">See followers</Link>
      <Outlet context={{nameOfMyUser: users[Number(userId)-1].name}} />
    </div>
  )
}

export default User;