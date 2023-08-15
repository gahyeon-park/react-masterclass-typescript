import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

function Coin() {
  // ※ 타입스크립트에 useParams에 어떤 타입의 파라미터들이 있는 지 알려줘야 함. 
  // const { coinId } = useParams<{coinId:string}>(); // 1번 방식
  const { coinId } = useParams<RouteParams>(); // 2번 방식
  console.log('useParams: ', coinId);
  
  return <h1>Coin: {coinId}</h1>
}

export default Coin;