export const SingleCoin = (id) =>
    `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalCoin = (id, days = 365, currency = 'USD') =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const CoinList = (currency = 'USD') =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`;
