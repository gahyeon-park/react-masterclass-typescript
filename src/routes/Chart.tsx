// import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface IChartProps {
  coinId: string;
}

interface IOhlcv {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId } : IChartProps) {
  // Chart 스크린에서 코인아이디를 얻는 방법
  // 1. 라우터로부터 파라미터 가져오기 (useParams)
  // const params = useParams();
  // 2. 이미 Coin 스크린에서 Chart 스크린을 렌더하고 있으므로, Coin에서 쓰고있는 coinId를 props로 받아오기

  // ohlcv =>  Open/High/Low/Close values (시가/고가/저가/종가 값)
  const { isLoading, data } = useQuery<IOhlcv>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  
    return (
    <>
      {isLoading ? "Loading..." : <div>{data?.open}</div>}
    </>
  )
}

export default Chart;