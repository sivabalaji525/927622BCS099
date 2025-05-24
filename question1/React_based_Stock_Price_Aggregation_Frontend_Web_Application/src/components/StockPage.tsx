import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { StockChart } from './StockChart';
import { fetchStocks } from '../services/api';

const StockPage = () => {
  const [stocks, setStocks] = useState<Record<string, string>>({});
  const [selectedStock, setSelectedStock] = useState<string>('');

  useEffect(() => {
    const getStocks = async () => {
      try {
        const response = await fetchStocks();
        setStocks(response.stocks);
        if (response.stocks) {
          setSelectedStock(Object.values(response.stocks)[0]);
        }
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    getStocks();
  }, []);

  return (
    <Box>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Stock</InputLabel>
        <Select
          value={selectedStock}
          label="Select Stock"
          onChange={(e: SelectChangeEvent) => setSelectedStock(e.target.value)}
        >
          {Object.entries(stocks).map(([name, symbol]) => (
            <MenuItem key={symbol} value={symbol}>
              {name} ({symbol})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedStock && <StockChart ticker={selectedStock} />}
    </Box>
  );
};

export default StockPage;
