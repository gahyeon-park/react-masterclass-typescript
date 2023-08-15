import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from 'react';

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.p`
  text-align: center;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
};

function Coin() {
  const [loading, setLoading] = useState(true);
  // const { coinId } = useParams<{coinId:string}>(); // 1번 방식
  const { coinId } = useParams<RouteParams>(); // 2번 방식
  const { state } = useLocation<RouteState>();
  
  // Coins에서 사용자가 클릭한 Coin의 name을 가지고 아래와 같은 해당 코인의 트위터, 이벤트, 환율 정보 API를 불러올 수 있다.
  // 'https://api.coinpaprika.com/v1/coins/${코인name}/twitter'
  // 'https://api.coinpaprika.com/v1/coins/${코인name}/events'
  // 'https://api.coinpaprika.com/v1/coins/${코인name}/exchanges'
  // 위 API를 불러오기 전까지 화면에 '로딩'만 표시되어야 할까?
  // 우리는 Coins에서 코인을 클릭해서 들어왔으므로 클릭한 코인 이름에 대한 정보는 이미 갖고 있고 이말인즉, 코인이름은 바로 화면에 그릴 수 있다는 것.
  // 즉, Coins에서 코인 클릭해서 Coin화면으로 오면, 로딩만 돌아가는 게 아니라 적어도 코인이름은 바로 보여줄 수 있다는 것이다.
  // └> 매우 빠르게 코인이름을 화면에 보여줄 수 있음.

  // 코인이름을 받는 방법은
  //  1. useParams()를 사용해 URL정보로 받거나, 2. 화면간 전달된 데이터에 접근할 수 있는 useLocation을 사용하는 것.
  //  ★ URL 매개변수로 가져오는 것(1. useParams)보다 화면간 state로 데이터를 즉시 전송&전달 받는 게(2. useLocation을) 더 효율적이고 빠름 ★
  // => Coins 화면에서 이미 fetch한 데이터를 <Link>의 to 개체에 state로 전달하고, Coin 화면에서는 useLocation()을 사용해 그대로 받기만 하면 된다. (= 비하인드 더 씬)

  // ★ 주의: Coins화면에서 코인 <Link>를 클릭해서 진입해야만 state가 생성된다. ★
  // (= URL에 코인name을 직접 입력해서 접속하면 state를 생성하지 못하고 Coin에서는 당연히 state가 undefined가 된다.)
  // ∴ 위 상황을 대응하기 위해 (state && state.name) || 'Loading...'로 처리 ↓↓↓
  // └> URL에 코인name을 직접 입력해서 접속할 경우에는 'Loading...'이 나오고, Coins에서 클릭해서 접속할 경우에는 코인 이름 노출.
  return (
    <Container>
      <Header><Title>{(state && state.name) || 'Loading...'}</Title></Header>
      {
        loading ?
        <Loader>Loading...</Loader> : 
        null
      }
    </Container>
  )
}

export default Coin;