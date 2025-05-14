import React from 'react';
import { Button } from '@mui/material';

const OOPS_STYLE = {
  backgroundImage:
    'url(https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <h1 className="text-[100px] font-extrabold leading-none mb-4" style={OOPS_STYLE}>
        Oops!
      </h1>
      <h2 className="text-xl font-bold mb-2">404 - PAGE NOT FOUND</h2>
      <p className="text-gray-600 max-w-md mb-6">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>
      <Button variant="contained" color="primary" href="/" sx={{ borderRadius: '9999px', px: 3 }}>
        Go to Homepage
      </Button>
    </div>
  );
};

export default PageNotFound;
