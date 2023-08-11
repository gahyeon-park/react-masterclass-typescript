import { useOutletContext, useParams } from 'react-router-dom';

interface IFollowersContext {
  nameOfMyUser: string;
}

function Followers() {
  // 부모 컴포넌트의 <Outlet />으로 렌더되는 하위컴포넌트에서 데이터를 받는 방법
  // 1. useParams()로 동적 데이터 받기.
  // const { userId } = useParams(); 
  // 2. useOutletContext()로 <Outlet context={} />에서 전달한 context 받기
  const { nameOfMyUser } = useOutletContext<IFollowersContext>();
  
  console.log(nameOfMyUser);

  return (
    <h1>Here are {nameOfMyUser}'s followers</h1>
  )
}

export default Followers;