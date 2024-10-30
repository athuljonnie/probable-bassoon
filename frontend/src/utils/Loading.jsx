// components/Loading.js
import React from 'react';
import { CircularProgress } from '@mui/material';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <CircularProgress color="primary" />
  </div>
);

export default Loading;
