import React, { useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
        await logout();
        navigate('./views/auth/Login');
      };
      
      performLogout();
    }, [navigate]);

  return (
    <div>Logging out...</div>
  );
};

export default Logout;
