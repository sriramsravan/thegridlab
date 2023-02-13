import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  });
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (jwt) => {
    setIsAuthenticated(true);
    setToken(jwt);
    localStorage.setItem('token', jwt);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
