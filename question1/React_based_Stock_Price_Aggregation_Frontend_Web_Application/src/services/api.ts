const BASE_URL = 'http://20.244.56.144/evaluation-service';

export const fetchStocks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stocks`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return { stocks: {} };
  }
};

export const fetchStockPrice = async (ticker: string, minutes?: number) => {
  try {
    const url = `${BASE_URL}/stocks/${ticker}${minutes ? `?minutes=${minutes}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return Array.isArray(data) ? data : [data.stock];
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return [];
  }
};
