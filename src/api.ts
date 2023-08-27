const BASED_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = async () => {
  return fetch(`${BASED_URL}/coins`).then((res) => res.json());
};

export const fetchCoinInfo = async (coinId: string) => {
  return await (await fetch(`${BASED_URL}/coins/${coinId}`)).json();
};

export const fetchCoinTickers = async (coinId: string) => {
  return await (await fetch(`${BASED_URL}/tickers/${coinId}`)).json();
};

export const fetchCoinHistory = async (coinId: string) => {
  // const endDate = Math.floor(Date.now() / 1000); // Date.now(): 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리초를 반환
  // const startDate = endDate - (60 * 60 * 24 * 7); // startDate = endDate로부터 일주일 전: endDate - (60초 * 60분 * 24시간 * 7일 => 7일(168시간)을 초단위부터 계산)
  // const beforeOneDay = endDate - (60 * 60 * 23);

  // console.log(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`);

  // return await (
  //   await fetch(`${BASED_URL}/coins/${coinId}/ohlcv/historical`)
  // ).json();
  return await (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
  ).json();
};
