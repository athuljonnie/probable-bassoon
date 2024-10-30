// components/ErrorMessage.js
import React from 'react';
import { Typography, Button } from '@mui/material';

const ErrorMessage = ({ error, onRetry, retrying }) => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <Typography color="error" variant="body1">{error}</Typography>
    <Button variant="contained" color="secondary" onClick={onRetry} disabled={retrying}>
      {retrying ? 'Retrying...' : 'Retry'}
    </Button>
  </div>
);

export default ErrorMessage;
