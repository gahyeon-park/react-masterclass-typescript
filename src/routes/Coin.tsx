import {
  useParams,
  useLocation,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
// import { useState, useEffect } from 'react';
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.p`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

// ※ props명을 isActive로 한 경우, React DOM요소가 isActive prop를 인식하지 못하는 에러 발생 → $isActive로 변경하면 에러 X
const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}

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
    };
  };
}

interface iCoinProps {
  isDark: boolean;
}

function Coin({ isDark } : iCoinProps) {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  let priceMatch = useRouteMatch("/:coinId/price");
  let chartMatch = useRouteMatch("/:coinId/chart");
  // └> useRouteMath에 인자로 넘긴 경로와 화면의 URL이 같다면 route관련 object를 리턴, 같지 않을 경우는 null 리턴

  const { isLoading: infoLoading, data: infoData } = useQuery<IinfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 10000 }
  );
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
  //     const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Suply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>

          {/* <Link to={`${match.url}/price`}>Price</Link>
          <Link to={`${match.url}/chart`}>Chart</Link> */}
          {/* <Link to={`/${coinId}/price`}>Price</Link>
          <Link to={`/${coinId}/chart`}>Chart</Link> */}

          <Switch>
            <Route path="/:coinId/price">
              <Price />
            </Route>
            <Route path="/:coinId/chart">
              <Chart coinId={coinId} isDark={isDark} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
