import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { fetchStocks } from '../services/api';

const CorrelationHeatmap: React.FC = () => {
  const [stocks, setStocks] = useState<Record<string, string>>({});

  useEffect(() => {
    const getStocks = async () => {
      try {
        const response = await fetchStocks();
        setStocks(response.stocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    getStocks();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, minHeight: '500px' }}>
      <Box>
        <h2>Stock Correlation Heatmap</h2>
        {/* Heatmap implementation will go here */}
      </Box>
    </Paper>
  );
};

export default CorrelationHeatmap;
