import React, { useState, useEffect } from 'react';
import { Box, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchStockPrice } from '../services/api';

interface StockChartProps {
  ticker: string;
}

export const StockChart = ({ ticker }: StockChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [minutes, setMinutes] = useState(15);
  const timeIntervals = [5, 15, 30, 60];

  useEffect(() => {
    const fetchData = async () => {
      const prices = await fetchStockPrice(ticker, minutes);
      setData(prices);
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [ticker, minutes]);

  return (
    <Paper elevation={3} sx={{ p: 2, height: '500px' }}>
      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel>Time Range</InputLabel>
        <Select
          value={minutes}
          label="Time Range"
          onChange={(e) => setMinutes(Number(e.target.value))}
        >
          {timeIntervals.map((interval) => (
            <MenuItem key={interval} value={interval}>
              {interval} minutes
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ height: 'calc(100% - 80px)' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="lastUpdatedAt" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};
