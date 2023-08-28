import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";

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
  color: ${(props) => props.theme.accentColor};
`;

const CoinsList = styled.ul``;

const CoinItem = styled.li`
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.cardBgColor};
  border: 1px solid white;
  color: ${(props) => props.theme.textColor};

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.p`
  text-align: center;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // ※ reactQuery는 API 데이터를 캐싱하기 때문에
  // 코인상세(Coin)에서 코인홈(Coins) 화면으로 돌아올 때 로딩없이 캐시된 데이터로 코인목록을 바로 그릴 수 있다.
  // (아래에 기존 useEffect 내에서 API 불러올 때는 코인상세에서 홈으로 올 때마다 로딩이 나왔음)
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  // const [loading, setLoading] = useState(true);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);

  // useEffect(() => {
  //   (async() => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <CoinItem key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: {
                    name: coin.name,
                  },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </CoinItem>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
