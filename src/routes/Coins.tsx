
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

const CoinsList = styled.ul`

`;

const CoinItem = styled.li`
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: white;
  color: ${props => props.theme.bgColor};
  
  a {
    display: block;
    padding: 20px;
    transition: color .2s ease-in;
  }

  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Loader = styled.p`
  text-align: center;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
};

function Coins() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<CoinInterface[]>([]); // typeScript에게 state값은 CoinInterface로 typed된 Coin 배열을 받는다는 것을 알려준다.
  
  useEffect(() => {
    (async() => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  console.log(coins);

  return (
    <Container>
      <Header><Title>코인</Title></Header>
      {loading ? 
        <Loader>Loading...</Loader> : 
        <CoinsList>
          {coins.map(coin => <CoinItem key={coin.id}><Link to={`/${coin.id}`}>{coin.name} &rarr;</Link></CoinItem>)}
        </CoinsList>
      }
    </Container>
  )
}

export default Coins;