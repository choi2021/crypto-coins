const BASE_URL = 'https://api.coinpaprika.com/v1';

export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
export async function fetchPriceData(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}?quotes=KRW`).then((response) =>
    response.json()
  );
}
export async function fetchInfoData(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchOHLCData(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 6;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
