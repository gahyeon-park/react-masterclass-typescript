const BASED_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = async() => {
  return fetch(`${BASED_URL}/coins`).then((res => res.json()));
}

export const fetchCoinInfo = async(coinId: string) => {
  return await (await fetch(`${BASED_URL}/coins/${coinId}`)).json();
}

export const fetchCoinTickers = async(coinId: string) => {
  return await (await fetch(`${BASED_URL}/tickers/${coinId}`)).json();
}