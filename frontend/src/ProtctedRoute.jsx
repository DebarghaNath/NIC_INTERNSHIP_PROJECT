import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtctedRoute = ({ component: Component }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3000/checkSession', { withCredentials: true });
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  if (isLoggedIn === null) {
    return <p>Loading...</p>; // Or a loading spinner
  }

  return isLoggedIn ? <Component /> : <Navigate to="/dashboard" />;
};

export default ProtctedRoute;
