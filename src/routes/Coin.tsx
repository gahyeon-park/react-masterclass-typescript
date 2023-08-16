import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';

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
};
interface RouteState {
  name: string;
};

interface ITag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

interface IinfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}

function Coin() {
const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<IinfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
      console.log(infoData);
      console.log(priceData);
      
      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, []); // ← 감시할 데이터가 없을 경우에는 빈 배열이라도 넣어야 함. 넣지 않을경우 useEffect 내 함수 무한대로 호출
  
  
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