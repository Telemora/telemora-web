'use client';

import { useEffect } from 'react';

const Eruda = () => {
  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient /* && process.env.NODE_ENV === 'development'*/) {
      const eruda = require('eruda');
      eruda.init();
    }
  }, []);

  return null;
};

export default Eruda;
