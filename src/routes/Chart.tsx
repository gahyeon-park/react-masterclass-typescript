// import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IChartProps {
  coinId: string;
}

interface IOhlcv {
  time_open: number;
  time_close: number;
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
              labels: {
                show: false,
              },
              categories: data?.map(
                (price) => new Date(price.time_close * 1000)
              ),
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
            colors: ["dodgerblue"],
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                gradientToColors: ["lightcoral"],
                stops: [0, 100],
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;