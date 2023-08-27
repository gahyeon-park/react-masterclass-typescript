// import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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

function Chart({ coinId }: IChartProps) {
  // ohlcv =>  Open/High/Low/Close values (시가/고가/저가/종가 값)
  const { isLoading, data } = useQuery<IOhlcv[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const getDate = (milliSecond: string) => {
    const dateIns = new Date(parseInt(milliSecond, 10));
    const month = dateIns.getMonth() + 1; // 달의 경우 반환값 0부터 시작(1월: 0 ~ 12월: 11)
    const date = dateIns.getDate();

    return `${month}/${date}`;
  };

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data ? data.map((price) => Number(price.close)) : [],
            },
          ]}
          options={{
            chart: {
              width: 500,
              height: 300,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            xaxis: {
              categories: data?.map((price) => getDate(price.time_close)),
            },
            yaxis: {
              show: false,
            },
            stroke: {
              curve: "smooth",
            },
            theme: {
              mode: "dark",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
