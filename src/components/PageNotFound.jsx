import React from 'react';
import { Button } from '@mui/material';
import { href, useNavigate } from 'react-router-dom';

const OOPS_STYLE = {
  backgroundImage:
    'url(https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <h1 className="text-[100px] font-extrabold leading-none mb-4" style={OOPS_STYLE}>
        Oops!
      </h1>
      <h2 className="text-xl font-bold mb-2">404 - PAGE NOT FOUND</h2>
      <p className="text-gray-600 max-w-md mb-6">
        The page you are looking for might have been removed, renamed, or is not accessible to you.
      </p>
      {/* <Button variant="contained" href="/" sx={{ borderRadius: '999px', px: 3, background: "#hhsdf" }}>
        Go to Homepage
      </Button> */}

      <button className='bg-primary px-4 py-2 rounded-md shadow-md text-white font-semibold font-helvetica' onClick={() => navigate("/")}>
        Go to Homepage
      </button>
    </div>
  );
};

export default PageNotFound;
