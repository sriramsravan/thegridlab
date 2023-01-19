import React from 'react';
import {Typography } from '@mui/material';

function Duration({ seconds }) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <Typography variant="body1">
      {h}:{m < 10 ? '0' : ''}{m}:{s < 10 ? '0' : ''}{s}
    </Typography>
  );
}

export default Duration;
