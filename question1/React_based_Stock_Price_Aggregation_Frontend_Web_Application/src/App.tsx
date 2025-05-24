import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Container, Typography, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import StockPage from './components/StockPage';
import CorrelationHeatmap from './components/CorrelationHeatmap';

function App() {
  const [tab, setTab] = useState(0);

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Stock Price Aggregator
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
              <Tab label="Stock Prices" />
              <Tab label="Correlation Heatmap" />
            </Tabs>
          </Box>
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={tab === 0 ? <StockPage /> : <CorrelationHeatmap />} />
            </Routes>
          </Box>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
