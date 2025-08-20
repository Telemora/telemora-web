'use client';

import { useEffect } from 'react';

const Eruda = () => {
  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      const eruda = require('eruda');
      eruda.init();
    }
  }, []);

  return null;
};

export default Eruda;
